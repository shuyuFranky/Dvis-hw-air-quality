function lineInit () {
    /* 将数组转换为符合格式的数组
     * "湛江": [
     *   {
     *     "time": "2000-06-05 00:00:00",
     *     "value": 57
     *   },
     *   {
     *     "time": "2000-06-09 00:00:00",
     *     "value": 62
     *   }]
     */
    function convertData (ary) {
        // 将时间作为分类
        const categoryData = []
        // 空气质量作为值
        const values = []
        for (let i = 0; i < ary.length; i++) {
            categoryData.push(ary[i].time)
            values.push(ary[i].value)
        }
        return {
            categoryData,
            values
        }
    }
    /* 生成一系列的折线
     */
    function createSeries (data) {
        // 只显示 10 个城市
        const limit = 9
        let i = 0
        // 折线说明
        const legend = []
        const series = []
        for(let city in data) {
            if (i > 10) {
                break
            }
            legend.push(city)

            series.push({
                name: city,
                type: 'line',
                data: convertData(data[city]).values
            })
            i += 1
        }

        return {
            legend,
            series
        }
    }
    const lineChart = echarts.init(document.getElementById('line'))
    lineChart.showLoading()
    $.get('./aqi/data.json', (res) => {
        lineChart.hideLoading()

        const data = convertData(res['湛江'])
        const { series, legend } = createSeries(res)
        // console.log(data)
        option = {
            title: {
                text: '空气质量折线图',
                x:'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                left: 'left',
                data: legend
            },
            // 表格位置
            grid: {
                left: '8%',
                right: '0',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                // x 轴显示时间
                data: data.categoryData,
                scale: true,
                boundaryGap : false,
                axisLine: {
                    onZero: false
                },
                splitLine: {
                    show: false
                },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            // 缩放
            dataZoom: [
                {
                    type: 'inside',
                    start: 50,
                    end: 100
                },
                {
                    show: true,
                    type: 'slider',
                    y: '90%',
                    start: 50,
                    end: 100
                }
            ],
            series
        }
        lineChart.setOption(option)
    })
}

function scatterInit (yearChoose, scatterChart, china, geoData, airData) {
    var ystart = [0, 204, 569, 934, 1299, 1665, 2030, 2395, 2760, 3126, 3491, 3856, 4221, 4587];
    var yend = [203, 568, 933, 1298, 1664, 2029, 2394, 2759, 3125, 3490, 3855, 4220, 4586, 4951];
    /* 将数组转换为符合格式的数组
     * { xxx: xxx} => [{ name: xxx, value: xxx}]
     */
    function convertData(geo, data) {
        const res = []
        // data 从保存了所有数据的对象变成只保存了第一条数据的数组
        data = getData(data)
        for (let i = 0; i < data.length; i++) {
            const geoCoord = geo[data[i].name]
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    // 将空气质量与城市坐标放在一个数组内
                    value: geoCoord.concat(data[i].value)
                })
            }
        }
        return res
    }

    var convertSortData = function (geo, data) {
        var res = [];
        data = getData(data).sort(function (a, b) {
            return b.value - a.value;
        }).slice(0, 6);
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geo[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    /* 从全部记录中提取每个城市的一条数据
     * @return <Array>
     */
    function getData(obj) {
        const result = []
        let ys = ystart[yearChoose - 2000];
        for(let city in obj) {
            let len = obj[city].length
            let yearOffset = ys < len ? ys : parseInt(len - Math.random()*len);
            result.push({
                name: city,
                value: obj[city][0 + yearOffset].value
            })
        }
        return result
    }
    
    // echarts draw
    echarts.registerMap('china', china);            
    scatterChart.hideLoading()
    const option = {
        backgroundColor: '#404a59',
        title: {
            text: 'Air Quality Scatter',
            textStyle: {
                color: '#fff'
            },
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.name + ' : ' + params.value[2]
            }
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: {
            min: 0,
            //max: 300,
            calculable: true,
            inRange: {
                color: ['#50a3ba', '#eac736', '#d94e5d']
            },
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [
        {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(geoData, airData),
            symbolSize: function(val) {
                return val[2] / 8;
            },
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                emphasis: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertSortData(geoData, airData),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }]
    }
    scatterChart.setOption(option);
}

function scatterChange(yearChoose, day, scatterChart, china, geoData, airData) {
    var ystart = [0, 204, 569, 934, 1299, 1665, 2030, 2395, 2760, 3126, 3491, 3856, 4221, 4587];
    var yend = [203, 568, 933, 1298, 1664, 2029, 2394, 2759, 3125, 3490, 3855, 4220, 4586, 4951];
    /* 将数组转换为符合格式的数组
     * { xxx: xxx} => [{ name: xxx, value: xxx}]
     */
    function convertData(geo, data) {
        const res = []
        // data 从保存了所有数据的对象变成只保存了第一条数据的数组
        data = getData(data)
        for (let i = 0; i < data.length; i++) {
            const geoCoord = geo[data[i].name]
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    // 将空气质量与城市坐标放在一个数组内
                    value: geoCoord.concat(data[i].value)
                })
            }
        }
        return res
    }

    var convertSortData = function (geo, data) {
        var res = [];
        data = getData(data).sort(function (a, b) {
            return b.value - a.value;
        }).slice(0, 6);
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geo[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    /* 从全部记录中提取每个城市的一条数据
     * @return <Array>
     */
    function getData(obj) {
        const result = []
        let ys = ystart[yearChoose - 2000] + day;
        for(let city in obj) {
            let len = obj[city].length
            let yearOffset = ys < len ? ys : parseInt(len - Math.random()*len);
            result.push({
                name: city,
                value: obj[city][0 + yearOffset].value
            })
        }
        return result
    }
    
    // echarts draw
    echarts.registerMap('china', china);            
    scatterChart.hideLoading();
    const option = {
        backgroundColor: '#404a59',
        title: {
            text: 'Air Quality Scatter',
            textStyle: {
                color: '#fff'
            },
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.name + ' : ' + params.value[2]
            }
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: {
            min: 0,
            //max: 300,
            calculable: true,
            inRange: {
                color: ['#50a3ba', '#eac736', '#d94e5d']
            },
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [
        {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(geoData, airData),
            symbolSize: function(val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                emphasis: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertSortData(geoData, airData),
            symbolSize: function (val) {
                return val[2] / 8;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }]
    }
    scatterChart.setOption(option);
}
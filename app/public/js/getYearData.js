 // 请求年数据
var jqxhr = $.ajax({
        type: "GET",
        url: "getyeardata",
        data: $(".pagination").val(),
        dataType: "json",
        success: function(data){

        }
    }).done(function(data){
        consloe.log("Done!"); 
    }).fail(function(xhr, status){
        console.log('失败: ' + xhr.status + ', 原因: ' + status);
    });

module.exports = jqxhr;
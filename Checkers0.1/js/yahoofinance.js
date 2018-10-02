function objectHandle(object){
    alert("Here");
    jsLog(object);
    if(object === null){
        document.getElementById("stock_Info").innerHTML = "You did not enter a query."
        return false;
    }
    else if(object.hasOwnProperty("Error Message")){
        document.getElementById("stock_Info").innerHTML = "Error, your entry does not match any known stock tags."
        return false;
    }
    else{
        document.getElementById("stock_Info").innerHTML = object["Meta Data"]["1. Information"];
        document.getElementById("stock_Symbol").innerHTML = object["Meta Data"]["2. Symbol"];
        document.getElementById("stock_LastRefreshed").innerHTML = object["Meta Data"]["3. Last Refreshed"];
        document.getElementById("stock_Interval").innerHTML = object["Meta Data"]["4. Interval"];
        document.getElementById("stock_TimeZone").innerHTML = object["Meta Data"]["6. Time Zone"];
        return true;
    }


}

function jsLog(object) {
    console.log(object);

}

function renderChart(data) {
    console.log(data);
    console.log(data["Time Series (5min)"]);
    var dataArray = new Array();
    var i = 0;
    for (var key in data["Time Series (5min)"]){
        console.log(key);
        var tempObj = {label: "none", value: "none"};
        tempObj["label"] = key;
        tempObj["value"] = data["Time Series (5min)"][key]["1. open"];
        dataArray[i] = tempObj;
        i++;

    }

    var dataSource = {
        "chart": {
            "caption": "Selected stock Today",
            "yaxisname": "Price per share (USD)",
            "subcaption": "subcaption",
            "numberprefix": "$",
            "showValues": "0",
            "setadaptiveymin": "1",
            "theme": "fusion"
        },
        "data": dataArray
    };
    var myChart = new FusionCharts({
        type: "line",
        renderAt: "chart-1",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource: dataSource
    }).render();
}






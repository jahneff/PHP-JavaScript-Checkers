

<!DOCTYPE html>



<html lang="en" data-framework="intercoolerjs" xmlns="http://www.w3.org/1999/html">


<head>
    <meta charset="utf-8">
    <title>Checkers</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <script src="../fusioncharts/js/fusioncharts.js"></script>
    <script src="../js/jquery-2.2.4.min.js"></script>
    <script src="../js/yahoofinance.js"></script>

    <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>
    <nav class="navbar navbar-dark bg-primary fixed-top sidebarNavigation" data style="margin-bottom: 0px; background-color: #3d9970;">
        <a class="navbar-brand" href="home.php"><b>Jack Neff</b></a>
        <a class="navbar-brand" href="checkers.php" ><b>Checkers</b></a>

        <div class="gs2-button" style="float:right; margin-right: 10px;">
            <a class="btn btn-primary" href="parameters.php?" role="button" style="background-color:#5cb85c; border-color: #ffffff; margin: 5% auto; font-size: 125%;"><b>Settings</b></a>
        </div>
    </nav>


</head>


<body>
    <form id="form1" action="yahoofinance.php" method="post" style="display: inline-block; border: 1px solid black; width: auto; margin: 2% 2% 2% 2%; padding: 3px 3px 3px 3px;">
        <div>Search for a stock by the Ticker Tag below</div>
        <input type="text" name="stockTag" value=""/>
        <input type="submit" id="stock_SearchInput" value="submit form"/>
    </form>
    <div id="stock_Info">Search results will display here</div>
    <div id="stock_Symbol"></div>
    <div id="stock_LastRefreshed"></div>
    <div id="stock_Interval"></div>
    <div id="stock_TimeZone"></div>

    <div class="chart-container" id="chart-1">Stock chart renders here</div>

    <?php

    if (isset($_POST['stockTag'])) {
        echo "<script type='text/javascript'>jsLog('" . $_POST['stockTag'] . "');</script>";
        $tag = $_POST['stockTag'];
        if($tag === ""){
            echo "<script type='text/javascript'>objectHandle(null);</script>";
        }
        else {
            $data = file_get_contents("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" . $tag . "&interval=5min&apikey=T8DFIBRKNMRV4ZCR");
            echo "<script type='text/javascript'>objectHandle($data);</script>";
            echo "<script type='text/javascript'>renderChart($data);</script>";
        }

    }
    else {
        echo "<script type='text/javascript'>jsLog('Stock tag is not set.');</script>";

    }

    ?>
</body>
</html>

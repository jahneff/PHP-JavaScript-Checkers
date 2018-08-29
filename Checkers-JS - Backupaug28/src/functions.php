<?php
function pageLoad()
{ //Loads json object from state file if it exists
    if (file_exists("state.txt") && filesize("state.txt") > 0) {
        echo "File state.txt exists";
        $fp = fopen("state.txt", 'r');
        $json = fread($fp, filesize("state.txt"));
        fclose($fp);
        return json_decode($json, true);
    } else {
        echo "File state.txt does not exist, creating...";
        return newGame();
    }
}
function newGame()
{ //Creates a new statefile with newgame values
    $fp = fopen("state.txt", 'wa+');
    //Json object initialized with pieces in new game positons
    $json = "{ \"turn\": \"1\",
               \"black\": {
                            \"name\" : \"Jimmy\",
                            \"isInCheck\" : \"0\",
                            \"b_pawn1:\" : { \"moved\" : \"0\" },
                            \"b_pawn2:\" : { \"moved\" : \"0\" },
                            \"b_pawn3:\" : { \"moved\" : \"0\" },
                            \"b_pawn4:\" : { \"moved\" : \"0\" },
                            \"b_pawn5:\" : { \"moved\" : \"0\" },
                            \"b_pawn6:\" : { \"moved\" : \"0\" },
                            \"b_pawn7:\" : { \"moved\" : \"0\" },
                            \"b_pawn8:\" : { \"moved\" : \"0\" },
                            \"b_rook1:\" : { \"moved\" : \"0\" },
                            \"b_knight1:\" : { \"moved\" : \"0\" },
                            \"b_bishop1:\" : { \"moved\" : \"0\" },
                            \"b_queen:\" : { \"moved\" : \"0\" },
                            \"b_king:\" : { \"moved\" : \"0\" },
                            \"b_bishop2:\" : { \"moved\" : \"0\" },
                            \"b_knight2:\" : { \"moved\" : \"0\" },
                            \"b_rook2:\" : { \"moved\" : \"0\" }
                            },
                \"white\": {
                            \"name\" : \"Joel\",
                            \"isInCheck\" : \"0\",
                            \"w_pawn1:\" : { \"moved\" : \"0\" },
                            \"w_pawn2:\" : { \"moved\" : \"0\" },
                            \"w_pawn3:\" : { \"moved\" : \"0\" },
                            \"w_pawn4:\" : { \"moved\" : \"0\" },
                            \"w_pawn5:\" : { \"moved\" : \"0\" },
                            \"w_pawn6:\" : { \"moved\" : \"0\" },
                            \"w_pawn7:\" : { \"moved\" : \"0\" },
                            \"w_pawn8:\" : { \"moved\" : \"0\" },
                            \"w_rook1:\" : { \"moved\" : \"0\" },
                            \"w_knight1:\" : { \"moved\" : \"0\" },
                            \"w_bishop1:\" : { \"moved\" : \"0\" },
                            \"w_queen:\" : { \"moved\" : \"0\" },
                            \"w_king:\" : { \"moved\" : \"0\" },
                            \"w_bishop2:\" : { \"moved\" : \"0\" },
                            \"w_knight2:\" : { \"moved\" : \"0\" },
                            \"w_rook2:\" : { \"moved\" : \"0\" }
                            },
                  \"board\": [
                        [{\"type\": \"rook\", \"color\": \"black\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"knight\", \"color\": \"black\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"bishop\", \"color\": \"black\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"queen\", \"color\": \"black\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"king\", \"color\": \"black\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"bishop\", \"color\": \"black\", \"id\": \"2\", \"moved\": \"0\"},
                         {\"type\": \"knight\", \"color\": \"black\", \"id\": \"2\", \"moved\": \"0\"},
                         {\"type\": \"rook\", \"color\": \"black\", \"id\": \"2\", \"moved\": \"0\"}],
                         
                        [{\"type\": \"pawn\", \"color\": \"black\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"black\", \"id\": \"2\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"black\", \"id\": \"3\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"black\", \"id\": \"4\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"black\", \"id\": \"5\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"black\", \"id\": \"6\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"black\", \"id\": \"7\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"black\", \"id\": \"8\", \"moved\": \"0\"}],
                         
                         [{\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"}],
                         
                         [{\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"}],
                         
                         [{\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"}],
                         
                         [{\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"},
                         {\"type\": \"empty\", \"color\": \"none\", \"id\": \"0\", \"moved\": \"0\"}],
                         
                         [{\"type\": \"pawn\", \"color\": \"white\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"white\", \"id\": \"2\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"white\", \"id\": \"3\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"white\", \"id\": \"4\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"white\", \"id\": \"5\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"white\", \"id\": \"6\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"white\", \"id\": \"7\", \"moved\": \"0\"},
                         {\"type\": \"pawn\", \"color\": \"white\", \"id\": \"8\", \"moved\": \"0\"}],
                         
                         [{\"type\": \"rook\", \"color\": \"white\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"knight\", \"color\": \"white\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"bishop\", \"color\": \"white\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"queen\", \"color\": \"white\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"king\", \"color\": \"white\", \"id\": \"1\", \"moved\": \"0\"},
                         {\"type\": \"bishop\", \"color\": \"white\", \"id\": \"2\", \"moved\": \"0\"},
                         {\"type\": \"knight\", \"color\": \"white\", \"id\": \"2\", \"moved\": \"0\"},
                         {\"type\": \"rook\", \"color\": \"white\", \"id\": \"2\", \"moved\": \"0\"}]
                        ]          
                        }";
    fwrite($fp, $json);
    fclose($fp);
    return json_decode($json, true);
}
?>
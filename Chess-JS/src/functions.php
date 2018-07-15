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
                        [{\"type\": \"b_rook\", \"id\": \"1\"},
                         {\"type\": \"b_knight\", \"id\": \"1\"},
                         {\"type\": \"b_bishop\", \"id\": \"1\"},
                         {\"type\": \"b_queen\", \"id\": \"1\"},
                         {\"type\": \"b_king\", \"id\": \"1\"},
                         {\"type\": \"b_bishop\", \"id\": \"2\"},
                         {\"type\": \"b_knight\", \"id\": \"2\"},
                         {\"type\": \"b_rook\", \"id\": \"2\"}],
                         
                        [{\"type\": \"b_pawn\", \"id\": \"1\"},
                         {\"type\": \"b_pawn\", \"id\": \"2\"},
                         {\"type\": \"b_pawn\", \"id\": \"3\"},
                         {\"type\": \"b_pawn\", \"id\": \"4\"},
                         {\"type\": \"b_pawn\", \"id\": \"5\"},
                         {\"type\": \"b_pawn\", \"id\": \"6\"},
                         {\"type\": \"b_pawn\", \"id\": \"7\"},
                         {\"type\": \"b_pawn\", \"id\": \"8\"}],
                         
                         [{\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"}],
                         
                         [{\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"}],
                         
                         [{\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"}],
                         
                         [{\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"},
                         {\"type\": \"none\", \"id\": \"0\"}],
                         
                         [{\"type\": \"w_pawn\", \"id\": \"1\"},
                         {\"type\": \"w_pawn\", \"id\": \"2\"},
                         {\"type\": \"w_pawn\", \"id\": \"3\"},
                         {\"type\": \"w_pawn\", \"id\": \"4\"},
                         {\"type\": \"w_pawn\", \"id\": \"5\"},
                         {\"type\": \"w_pawn\", \"id\": \"6\"},
                         {\"type\": \"w_pawn\", \"id\": \"7\"},
                         {\"type\": \"w_pawn\", \"id\": \"8\"}],
                         
                         [{\"type\": \"w_rook\", \"id\": \"1\"},
                         {\"type\": \"w_knight\", \"id\": \"1\"},
                         {\"type\": \"w_bishop\", \"id\": \"1\"},
                         {\"type\": \"w_queen\", \"id\": \"1\"},
                         {\"type\": \"w_king\", \"id\": \"1\"},
                         {\"type\": \"w_bishop\", \"id\": \"2\"},
                         {\"type\": \"w_knight\", \"id\": \"2\"},
                         {\"type\": \"w_rook\", \"id\": \"2\"}]
                        ]          
                        }";
    fwrite($fp, $json);
    fclose($fp);
    return json_decode($json, true);
}
?>
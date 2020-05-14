var p1_button = null;
var p2_button = null;
var last_update = {player1:"",player2:""}

var winstreak = document.getElementById("betStreak").innerHTML; //winrate
var balance = document.getElementById("balance").innerHTML; //grabs balance from html
var balnocomma = balance.replace(/,/g,""); //removes the comma
var bal = parseInt(balnocomma, 10); //changes string to int for math
var globalBal = bal; //balance
var globalPrebal = bal; //balance before win/loss

var logcount = 0; //prevents overwritting in the console
var upsetcount = 0; //counts number of upsets to post on balance log
var matchcount = -1; //counts matches


setTimeout(update,9000)
console.log('%c------------------------------------[INITIALIZING TRACKER]-----------------------------------', 'background: #222; color: #bada55');
function update()
{
    //Local balance variables
    var winstreak = document.getElementById("betStreak").innerHTML; //winrate
    var balance = document.getElementById("balance").innerHTML; //grabs balance from html
    var balnocomma = balance.replace(/,/g,""); //removes the comma
    var bal = parseInt(balnocomma, 10); //changes string to int

    p1_button = document.getElementById("player1");
    p2_button = document.getElementById("player2");
    var player1 = p1_button.value;
    var player2 = p2_button.value;
    ///Inital check for fighters
    if(player1.length == 0 || player2.length == 0)
        {
            if(logcount <= 1)
                {
                    console.log("Your current balance is: " +balance+ " Winstreak: " +winstreak);
                    console.log("---------------------------------------------------------------------------------------------");
                    logcount += 1
                    setInterval(update,45000)
                }
            else
                {
                    setInterval(update,45000)
                }
        }
    ///Compares current players to last players and adds to logcount so it doesn't post to console too often.
    if(player1 == last_update.player1 && player2 == last_update.player2)
        {
            if(logcount <= 1)
                {
                    logcount += 1
                    setInterval(update,45000)
                }
            else
                {
                    setInterval(update,60000)
                }
        }

///////////////////////////////////////////////////   Displays new match   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
                                                    //                  \\
    if(player1 != last_update.player1 || player2 != last_update.player2)
        {
            matchcount += 1
            logcount = 0;
            console.log("New match detected.");
            console.log("Current fighters: " +player1+ " vs " +player2);

            var prebal = globalBal;
            var postbal = bal;
            
            //Won match
            if(globalPrebal < bal)
                {
                    //console.log("Win");
                    var diff = null;
                    diff = postbal -= prebal;
                    console.log("Win:+" +diff+ " from: "+globalPrebal);

                }
            //Lost match
            if(globalPrebal > bal)
                {

                    var diff = null;
                    diff = prebal -= postbal;
                    console.log("Loss:-" +diff+ " from: "+globalPrebal);

                }
            //No change in salt
            if(globalPrebal == bal)
                {
                    console.log("Your salt didn't change.");

                }
            //Upset tracker
            var upset = diff * 2;
            //simulate upset
            //diff += diff * 3;
            if(diff >= upset)
                {
                    upsetcount += 1;
                    console.log("Your current balance is: " +balance+ " Winstreak: " +winstreak+ " Upsets this session: " +upsetcount+ " Matches this session: " +matchcount);
                    console.log('%c^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^UPSET^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', 'background: #222; color: #bada55');
                }
            else
                {
                    console.log("Your current balance is: " +balance+ " Winstreak: " +winstreak+ " Upsets this session: " +upsetcount+ " Matches this session: " +matchcount);
                }
            console.log("---------------------------------------------------------------------------------------------");
            //Below we will update all variables that have changed.
            globalBal = bal; //balance
            globalPrebal = bal; //balance before win/loss
            last_update.player1 = player1;
            last_update.player2 = player2;
            setInterval(update,60000)
        }
}

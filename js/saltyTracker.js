var p1_button = null;
var p2_button = null;
var last_update = {player1:"",player2:""}


var balance = document.getElementById("balance").innerHTML; //grabs balance from html
var balnocomma = balance.replace(/,/g,""); //removes the comma
var bal = parseInt(balnocomma, 10); //changes string to int for math
var globalBal = bal; //balance
var globalPrebal = bal; //balance before win/loss

var logcount = 0; //prevents overwritting in the console
var upsetcount = 0; //counts number of upsets to post on balance log
var matchcount = -1; //counts matches


setTimeout(update,9000)
///Checks for a new match and if betting is available
function update()
{
    //Local balance variables
    var winstreak = document.getElementById("betStreak").innerHTML; //winrate
    var balance = document.getElementById("balance").innerHTML; //grabs balance from html
    var balnocomma = balance.replace(/,/g,""); //removes the comma
    var bal = parseInt(balnocomma, 10); //changes string to int
    //console.log("INITIAL")
    //console.log("globalBal: " +globalBal+ " globalPrebal: " +globalPrebal+ " globalPostbal: " +globalPostbal)
    //console.log("bal: " +bal+ " prebal: " +prebal+ " postbal: " +postbal)
    //console.log("----------------------------------------------")
    p1_button = document.getElementById("player1");
    p2_button = document.getElementById("player2");
    var player1 = p1_button.value;
    var player2 = p2_button.value;
    ///Inital check for fighters
    if(player1.length == 0 || player2.length == 0)
        {
            if(logcount <= 1)
                {
                    console.log('%c-------------------------[INITIALIZING TRACKER]------------------------', 'background: #222; color: #bada55');
                    console.log("Your current balance is: " +balance+ " Winstreak: " +winstreak);
                    console.log("-----------------------------------------------------------------------");
                    logcount += 1
                    setInterval(update,15000)
                }
            else
                {
                    setInterval(update,15000)
                }
        }
    ///Compares current players to last players and adds to logcount so it doesn't post to console too often.
    if(player1 == last_update.player1 && player2 == last_update.player2)
        {
            if(logcount <= 1)
                {
                    logcount += 1
                    setInterval(update,30000)
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
            //console.log("Your current balance is: " +balance+ " Winstreak: " +winstreak);
            //console.log("----------------------------------------------");
            //Below we will do the math to equate the salt won and lost
////It may be easier to track the change in winstreak to decide whether we won or lost than to check the change in balance\\\\
            var prebal = globalBal;
            var postbal = bal;
            
            //Won match
            if(globalPrebal < bal)
                {
                    //console.log("Win");
                    var diff = null;
                    diff = postbal -= prebal;
                    console.log("Win:+" +diff+ " from: "+globalPrebal);
                    //console.log("diff = postbal -= globalPrebal")
                    //console.log("----------------------------------------------")
                }
            //Lost match
            if(globalPrebal > bal)
                {
                    //console.log("Loss");
                    //console.log("diff = prebal -= postbal")
                    //console.log("diff: " +diff+ " globalPrebal: " +prebal+ " postbal: " +postbal)
                    var diff = null;
                    diff = prebal -= postbal;
                    console.log("Loss:-" +diff+ " from: "+globalPrebal);
                    //console.log("diff: " +diff+ " prebal: " +prebal+ " postbal: " +postbal)
                    //console.log("----------------------------------------------")
                }
            //No change in salt
            if(globalPrebal == bal)
                {
                    console.log("Your salt didn't change.");
                    //console.log("----------------------------------------------")
                }
            //Upset tracker
            var upset = diff * 2;
            console.log("diff: " +diff+ " upset threshold: " +upset);
            //simulate upset
            //diff += diff * 3;
            if(diff >= upset)
                {
                    upsetcount += 1;
                    console.log("Your current balance is: " +balance+ " Winstreak: " +winstreak+ " Upsets this session: " +upsetcount+ " Matches this session: " +matchcount);
                    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^UPSET^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
                }
            else
                {
                    console.log("Your current balance is: " +balance+ " Winstreak: " +winstreak+ " Upsets this session: " +upsetcount+ " Matches this session: " +matchcount);
                }
            console.log("-----------------------------------------------------------------------");
            //console.log("----------------------------------------------")
            //console.log("globalBal: " +globalBal+ " globalPrebal: " +globalPrebal+ " prebal: " +prebal+ " postbal: " +postbal+ " diff: " +diff)
            //console.log("----------------------------------------------")
            //Below we will update all variables that have changed.
            globalBal = bal; //balance
            globalPrebal = bal; //balance before win/loss
            last_update.player1 = player1;
            last_update.player2 = player2;
            setInterval(update,60000)
        }
}
function listenToPlayersName() {
    // Updating Player Names by listening to input //
    var playersNameInput = document.querySelectorAll(".playerName");
    var playersNameInputArray = [...playersNameInput];

    for (let i = 0; i < playersNameInputArray.length; i++) {
        // replacing default names with new values/names //
        playersNameInputArray[i].addEventListener("change", function() {
            var newName = this.value;
            playerNames.splice(i, 1, newName);
        });
    }
}

var addNewPlayer = document.querySelector("#addPlayers input");
var numOfPlayers = addNewPlayer.value;
numOfPlayers++;

var newPlayer = addNewPlayer.addEventListener("change", function () {
    newPlayer = this.value;
    numOfPlayers = newPlayer;
    numOfPlayers++;
    addPlayers();
});

var applyNewPlayer = document.querySelector("#addPlayers #add");

applyNewPlayer.onclick = function () {
    document.querySelector("#addPlayers").classList.add("hide");
    addPlayers(); // Creating Players
    listenToPlayersName(); // Listen to change of names
}

var defaultPlayerName = "Player ";
var playerNames = [];

//* *** Adding num of players by prompt value and setting default Player names *** *//
function addPlayers (){
    // Iterating trough numofPlayers to add the Html for each Player && setting default names//
    for (i = 1; i != numOfPlayers; i++){
        console.log(i);
        var diceContainer = document.getElementById("dicee");
        playerNames.push(defaultPlayerName + i);
        diceContainer.innerHTML += 
        '<div id="player' + i + '" class="players">'+
            '<input name="player' + i + '" value="' + defaultPlayerName + i + '" class="playerName" type="text" placeholder="Player ' + i + '"/>' +
            '<div class="dice-box">' +
                '<div class="dice">' +
                    '<span class="dice-dot one"></span>' +
                    '<span class="dice-dot two"></span>' +
                    '<span class="dice-dot three"></span>' +
                    '<span class="dice-dot four"></span>' +
                    '<span class="dice-dot five"></span>' +
                    '<span class="dice-dot six"></span>' +
                '</div>' +
            '</div>' +
            '<button id="button_' + i + '" class="dice-roll" onclick="buttonRoll(' + (i - 1) + ')" >Roll the Dice</button>' +
        '</div>';
    } 

}

//* *** Roll's the dice when button has clicked as long as not every Player has rolled his dice***//
var randomNumArray = [];
var playersRolled = false;

function buttonRoll(index) {

    //* not every Player has rolled his dice *//
    if (playersRolled === false){
        var rollButton = document.querySelector("[onclick='buttonRoll(" + index + ")']");
        rollButton.classList.add("dice-rolled");
        var randomNum = Math.floor(Math.random() * 6) + 1;
        randomNumArray[index] = randomNum;

        //Getting index of player and the ralted diceDots
        var diceContainer = document.getElementById("player" + (index + 1)).querySelector(".dice");
        var diceDots = [...diceContainer.querySelectorAll(".dice-dot")];

        // changes classes of Dice to display random Number from randomNumberArray (1-6)
        if (randomNumArray[index] === 1){
            diceDots.forEach(el=>el.classList.add("hidden"));
            diceDots[2].classList.remove("hidden");
            diceDots[2].classList.add("middle");
            diceDots[5].classList.add("hide");
        }
        else if (randomNumArray[index] === 2){
            diceDots.forEach(el=>el.classList.add("hidden"));;
            diceDots[0].classList.remove("hidden");
            diceDots[5].classList.remove("hidden");
        }
        else if (randomNumArray[index] === 3){
            diceDots.forEach(el=>el.classList.add("hidden"));
            diceDots[0].classList.remove("hidden");
            diceDots[2].classList.remove("hidden");
            diceDots[2].classList.add("middle");
            diceDots[4].classList.remove("hidden");
            diceDots[5].classList.add("hide");
        }
        else if (randomNumArray[index] === 4){
            diceDots[2].classList.add("hidden");
            diceDots[3].classList.add("hidden");
        }
        else if (randomNumArray[index] === 5){
            diceDots[2].classList.add("middle");
            diceDots[5].classList.add("hide");
        }
        else if (randomNumArray[index] === 6){
            diceDots.forEach(el=>el.classList.remove("hide", "hidden", "middle"));
        }
    } 

    //* Every Player has rolled his dice *//
    if (randomNumArray.filter(Boolean).length === numOfPlayers - 1){
        playersRolled = true;
        var restartGame = document.getElementById("restartGame");

        // get highest number of randomNumArray && it's index
        var maxNum = Math.max.apply(null, randomNumArray);
        var maxNumIndex = randomNumArray.indexOf(maxNum);

        // get player's name with index of highest number && attach to result
        var winningPlayerName = playerNames[maxNumIndex];
        var winnerMassage = document.getElementById("result");
        winnerMassage.classList.remove("hide");

        //Check for ducplicates of maxNum in randomNumber Array
        var isThereDuplicate = false;
        var indexOfDuplicate = [];

        function findDuplicate (randomNumArray, maxNum){
        
            for (let i = 0; i < randomNumArray.length; i ++){

                if (randomNumArray[i] === maxNum) {
                    indexOfDuplicate.push(i);
                }
            }
            //console.log(indexOfDuplicate);

            if (indexOfDuplicate.length > 1){
                isThereDuplicate = true;
            }
            //console.log(isThereDuplicate);
            return isThereDuplicate;
        }
        findDuplicate(randomNumArray, maxNum);

        //Check for specific Player name to let them always win
        if (playerNames.includes("Helga") && playerNames.includes("Melek")) {
            winnerMassage.innerHTML = "&#129351; Helga wins and Melek gets " + maxNum + " Sausages!";
            restartGame.classList.remove("hide");
        }
        else if (playerNames.includes("Helga")){
            winnerMassage.innerHTML = "&#129351; Helga is the winner!"
            restartGame.classList.remove("hide");
        }
        else if (playerNames.includes("Melek")){
            winnerMassage.innerHTML = "&#129351; Melek is the winner!"
            restartGame.classList.remove("hide");
        }

        //Print out Player names for Draw/Duplicate Numbers in randomNumberArray
        else if (isThereDuplicate === true){
            console.log("There are duplicates at the indexes: " + indexOfDuplicate);
            var drawPlayers = [];

            for (i = 0; i < indexOfDuplicate.length; i++){
                drawPlayers.push(playerNames[indexOfDuplicate[i]]);
            }

            var drawPlayersMsg = drawPlayers.map( (e, i) => ("<br> " + e) ).join(' ');
            winnerMassage.innerHTML = "Drwa! The &#129351; winners are: " + drawPlayersMsg;
            restartGame.classList.remove("hide");
        }
        //Print out Winner when duplicate || specific name ==== false
        else{
            winnerMassage.innerHTML = "&#129351; " + winningPlayerName + " wins!";
            restartGame.classList.remove("hide");
        }

        restartGame.onclick = function(){
            location.reload();
        };

    }    
}
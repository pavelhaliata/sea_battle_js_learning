function init(){
    // Представление
  let view = {
    displayMessage: function(msg){
        let messageArea = document.querySelector('.messageArea');
        messageArea.innerHTML = msg;
    },
    displayHit: function(location){
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
        // let hit = document.querySelector('.messageArea__main');
        // hit.style.display = 'block';
        console.log(cell)
    },
    displayMiss: function(location){
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
        console.log(cell)

    }
  };  
//   Модель
  let model = {
    boardSize: 7,
    numShips: 3,
    shiplength: 3,
    shipsSunk: 0,
    ships: [
        {locations:['31', '41', '51'], hits:['','','']},
        {locations:['14','24','34'], hits:['','','']},
        {locations:['00','01','02'], hits:['','','']},
    ],
    fire: function(guess){
        for(let i = 0; i < this.numShips; i++){
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0){
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage('HIT!');
                if(this.isSunk(ship)){
                    view.displayMessage('You sank my battleship!')
                    this.shipsSunk++
                }
                return true;
           }
        }
        view.displayMiss(guess);
        view.displayMessage('You missed')
        return false;
    },
    isSunk: function(ship){
        for (let i = 0; i < this.shiplength; i++){
            if(ship.hits[i] !== 'hit')
            return false;
        }
        return true
    }
  };
//   Контроллер
let controller = {
    guess: 0,
    processGuess: function(guess){

    }
}

function parseGuess(guess){
    let alphabet = ['A','B','C','D','F','G'];
    if(guess === null || guess.length !==2 ){
        view.displayMessage('Oops, please enter a letter and a number on the bord!')
    } else{
        firstChar = guess.charAt(0);  // извлекаем первый символ строки
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1); // извлекакем второй символ строки
        if (isNaN(row) || isNaN(column)){
            view.displayMessage("Oops, that isn't on the board")
        }else if(row < 0 || row > model.boardSize || column < 0 || column >= model.boardSize){
            view.displayMessage("Oops, that's off the board")
        }else {
            // console.log(row+column)
            return row + column;
        }
    }
    return null;
}
// parseGuess('A7');


console.log(parseGuess('A0'))



















}
window.onload = init;




















    
// function validate(phoneNumber){
//     if(phoneNumber.length > 8 || phoneNumber.length < 7){
//         return false;
//     }
//     for(let i=0; i < phoneNumber.length; i++){
//         if( i === 3){
//             if(phoneNumber.length === 8 && phoneNumber[i] !== '-'){
//                 return false;
//             }else if (phoneNumber.length === 7 && isNaN(phoneNumber[i])){
//                 return false;
//             }
//         }else if(isNaN(phoneNumber[i])){
//             return false;
//         }
//     }
//     return phoneNumber;
// }


// console.log(validate('123-4567'))

// function validate2(phoneNumber2){
//     if ( phoneNumber2.length > 8 || phoneNumber2.length < 7){
//         return false;
//     }
//     let first = phoneNumber2.substring(0,3);
//     console.log(first)
//     let second = phoneNumber2.substring(phoneNumber2.length -4);
//     console.log(second)
//     if(isNaN(first) || isNaN(second)){
//         return false;
//     }
//     if(phoneNumber2.length === 8){
//         return (phoneNumber2.charAt(3) === '-'); 
//     }
//     return phoneNumber2;
// }
// console.log(validate2('123-4567'))


// function Duck(sound){
//     this.sound = sound;
//     this.quack = function() {console.log(this.sound);}
// }
// var toy = new Duck('quack quack');
// toy.quack();
// console.log(typeof toy);
// console.log(toy instanceof Duck);
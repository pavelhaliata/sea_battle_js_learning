function init(){






    // --------------------Представление-------------------
  
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
        // console.log(cell)
    },
    displayMiss: function(location){
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
        // console.log(cell)

    }
  };  

//   ---------------------Модель--------------------------;

  let model = {
    boardSize: 7,
    numShips: 3,
    shiplength: 3,
    shipsSunk: 0,
    generateShipLocations: function() //генерируем расположение кораблей и добавляем в массив ships.locations
    {   let locations;
        for(let i = 0; i < this.numShips; i++){
            do{
                locations = this.generateShip(); //генерируем расположение кораблей
            }while(this.collision(locations)); // проверяем условие правильность расположения кораблей если true, то сохраняем позиции в массиве model.ships
            this.ships[i].locations = locations; 
        }
    },
    generateShip: function(){
        let direction = Math.floor(Math.random()*2);
        let row, col;

        if (direction === 1){
            row = Math.floor(Math.random()*this.boardSize);
            col = Math.floor(Math.random()*this.boardSize - this.shiplength);
        }else{
            row = Math.floor(Math.random()*this.boardSize - this.shiplength);
            col = Math.floor(Math.random()*this.boardSize)
        };
        let newShipLocations = [];
        for(let i = 0; i < this.shiplength; i++){
            if(direction === 1){
                newShipLocations.push(row + '' + (col + i));//?????
            }else{
                newShipLocations.push((row + i) + '' + col);
            }
        };
        return newShipLocations;
    },
    ships: [
        {locations:['31', '41', '51'], hits:['','','']},
        {locations:['14','24','34'], hits:['','','']},
        {locations:['00','01','02'], hits:['','','']},
    ],
    fire: function(guess){
        for(let i = 0; i < this.numShips; i++){
            let ship = this.ships[i]; // перебераем массив ships и получаем три обекта (корабля) 
            let index = ship.locations.indexOf(guess); // с помощью indexOf получаем индеск строки или -1, если такого индекса нет (координаты позиции корабля);
            if (index >= 0) // если с помощью indexOf найдена строка и indexOf не возвращает -1, то...
                {ship.hits[index] = 'hit'; // ...регистрируется поподание и строка 'hit' помещается в массив hits
                view.displayHit(guess);
                view.displayMessage('HIT!');
                if(this.isSunk(ship)) // вызываем метод isSunk для проверки заполненности массива hits объекта ship 
                {view.displayMessage('You sank my battleship!')
                    this.shipsSunk++
                    console.log(this.shipsSunk)
                }
                // if(this.shipsSunk === 3){
                //     console.log('игра окончена')
                //     return false
                // }
                return true;
           }
        }
        view.displayMiss(guess);
        view.displayMessage('You missed')
        return false;
    },
    
    isSunk: function(ship) // проверям потоплен ли корабль 
    {for (let i = 0; i < this.shiplength; i++){
            if(ship.hits[i] !== 'hit') // проверям массив hits на заполненение индексов строкой 'hit'
            return false;
        }
        return true
    }
  };


  //   ----------------Контроллер----------------------

let controller = {
    guesses: 0,
    processGuess: function(guess){
        let location = parseGuess(guess);// вызываем функцию для проверки корректности введенных данных;
        if (location){
            this.guesses++ // счетчик выстрелов
            let hit = model.fire(location); // передаем строку методу fire
            if(hit && model.shipsSunk === model.numShips){
                view.displayMessage('You sank all my battleships, in ' + this.guesses + ' guesses')
                console.log('game over')
                return false
            }
        }
    }
}

// проверка и обработка введённых данных
function parseGuess(guess){
    let alphabet = ['A','B','C','D','E','F','G'];
    if(guess === null || guess.length !==2 ) // проверяем на наличие введенных данных и длину строки
    {view.displayMessage('Oops, please enter a letter and a number on the bord!')
    } else{
        let firstChar = guess.charAt(0);  // извлекаем первый символ строки
        let row = alphabet.indexOf(firstChar); // с помощью indexOf получаем индеск строки
        let column = guess.charAt(1); // извлекаем второй символ строки
        if (isNaN(row) || isNaN(column)) // определяем является ли нечисловым значением или нет
        {view.displayMessage("Oops, that isn't on the board")
        }else if(row < 0 || row > model.boardSize || column < 0 || column >= model.boardSize) // проверяем диапозон введенных значений от 0 до 6
        {view.displayMessage("Oops, that's off the board")
        }else {
            return row + column;
        }
    }
    return null;
}

document.querySelector('.fireButton').addEventListener('click', () =>{
    let guessInput = document.querySelector('.guessInput');
    guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = '';
    
});


document.querySelector('.guessInput').onkeypress =  handleKeyPress
    function handleKeyPress(e){
    if(e.keyCode === 13){
        document.querySelector('.fireButton').click();
        return false
    }
};

// document.querySelector('.guessInput').addEventListener('onkeypress', (e) =>{
//     if(e.keyCode === 13){
//         document.querySelector('.fireButton').click();
//         return false
//     }
// })


















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
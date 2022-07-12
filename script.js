function init(){
    
    
function validate(phoneNumber){
    if(phoneNumber.length > 8 || phoneNumber.length < 7){
        return false;
    }
    for(let i=0; i < phoneNumber.length; i++){
        if( i === 3){
            if(phoneNumber.length === 8 && phoneNumber[i] !== '-'){
                return false;
            }else if (phoneNumber.length === 7 && isNaN(phoneNumber[i])){
                return false;
            }
        }else if(isNaN(phoneNumber[i])){
            return false;
        }
    }
    return phoneNumber;
}


// console.log(validate('123-4567'))

function validate2(phoneNumber2){
    if ( phoneNumber2.length > 8 || phoneNumber2.length < 7){
        return false;
    }
    let first = phoneNumber2.substring(0,3);
    console.log(first)
    let second = phoneNumber2.substring(phoneNumber2.length -4);
    console.log(second)
    if(isNaN(first) || isNaN(second)){
        return false;
    }
    if(phoneNumber2.length === 8){
        return (phoneNumber2.charAt(3) === '-'); 
    }
    return phoneNumber2;
}
// console.log(validate2('123-4567'))


function Duck(sound){
    this.sound = sound;
    this.quack = function() {console.log(this.sound);}
}
var toy = new Duck('quack quack');
toy.quack();
console.log(typeof toy);
console.log(toy instanceof Duck);


console.log('work hard')
// начинаем мутить морской бой




}
window.onload = init;
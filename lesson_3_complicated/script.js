let myStr = "урок-3-был слишком легким";

myStr = myStr[0].toUpperCase() + myStr.slice(1); 
myStr = myStr.replace(new RegExp("-", 'g'), " ");
myStr = myStr.replace(new RegExp("-", "g"), " ");
console.log(myStr);

myStr = myStr.replace('им', 'о');
console.log(myStr);



let myArr = [20, 33, 1, "Человек", 2, 3];
myArr.splice(3, 1);
let myArrSqrt = 0;
for (let i = 0; i < myArr.length; i++) { 
    myArrSqrt += Math.pow(myArr[i],3); 
    } 
console.log('Квадратный корень из суммы кубов массива myArr - ' + Math.sqrt(myArrSqrt).toFixed(0));


function doIt(a) {
    if (typeof a !== "string") {
        console.log("Это не строка");
    } else {
        a = a.trim();
        let sliced = a.slice(0, 50);
        if (sliced.length < a.length) {
        return (sliced += "...");
        }
    }
}
    console.log(doIt("Я провела весь день над усложнённым заданием, и не доделала его"));

// Функция не работает именно так, как задано в уроке, и я пока не знаю, что нужно сделать для этого.
// Вернусь к заданию попозже, на свежую голову
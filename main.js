window.onload = function () {
    screenText = document.getElementById("screenText");
    secScreenText = document.getElementById("secScreenText");
    numButton = document.getElementsByClassName("numero");
    screenReset = false;
};

var num1 = null,
    num2 = null,
    num3 = null,
    numMem = null,
    operator = null;

/* ***************** USO DE TECLAS ***************** */

document.onkeydown = function (e) {
    let myKey = e.key;
    console.log(myKey);
    if (myKey.match(/[0-9.]/)) {
        numero(myKey);
    } else if (myKey.match(/[-/*+]/)) {
        operar(myKey);
    } else if (myKey == "Enter") {
        igualar();
    } else if (myKey == "Backspace") {
        retro();
    } else if (myKey == "Escape") {
        borradoTotal();
    } else if (myKey == "Delete") {
        borradoParcial();
    }
}

/* ***************** TECLAS DE CIFRAS Y COMA DECIMAL ***************** */

function numero(myNum) {
    if (screenReset == true) { // reseteamos la pantalla 
        screenText.innerHTML = "";
        screenReset = false;
    };
    if (screenText.innerHTML.length > 16) {

    } else {
        if (screenText.innerHTML.indexOf(".") > -1 && myNum == ".") { // impedir escribir más de un "."

        } else {
            if (screenText.innerHTML == "0" && myNum == ".") { // si el primer botón es un ".", se escribe 0.
                screenText.innerHTML += myNum;
                num1 = screenText.innerHTML;
                console.log(num1);
            } else if (screenText.innerHTML == "0") { // si el primer botón es un número, se reemplaza el 0 en pantalla por ese número
                screenText.innerHTML = "";
                screenText.innerHTML += myNum;
                num1 = screenText.innerHTML;
                console.log(num1);
            } else { // si ya hay un número en pantalla que no es 0, se concatenan otros números
                screenText.innerHTML += myNum;
                num1 = screenText.innerHTML;
                console.log(num1);
            }
        }
    }
};

/* ***************** OPERACIONES CON DOS NÚMEROS ***************** */

function operar(op) {
    igualar();
    num2 = screenText.innerHTML; // guardamos el número de la pantalla
    operator = op; // guardar el tipo de operación
    screenReset = true; // poner la pantalla a 0
    secScreenText.innerHTML = num2 + operator;
};

/* ***************** OPERACIONES CON UN NÚMERO ***************** */

function raizc() {
    secScreenText.innerHTML = "√(" + num1 + ")";
    num1 = Math.sqrt(num1);
    screenText.innerHTML = num1;
};

function porcent() {
    if (operator == "/" || operator == "*") {
        num1 = num1 / 100;
    } else {
        num1 = num2 * num1 / 100;
    }
    screenText.innerHTML = num1;
};

function opuest() {
    num1 = -num1;
    screenText.innerHTML = num1;
};

function inve() {
    secScreenText.innerHTML = "1/" + num1;
    num1 = 1 / num1;
    screenText.innerHTML = num1;
};

function pi() {
    secScreenText.innerHTML += "π";
    num1 = Math.PI;
    screenText.innerHTML = num1;
};

function numE() {
    secScreenText.innerHTML += "e";
    num1 = Math.E;
    screenText.innerHTML = num1;
};

function logaritmo() {
    if (num1 == null) {
        screenText.innerHTML = "Err";
    } else {
        secScreenText.innerHTML += "log(" + num1 + ")";
        num1 = Math.log10(num1);;
        screenText.innerHTML = num1;
    }
};

function ln() {
    if (num1 == null) {
        screenText.innerHTML = "Err";
    } else {
        secScreenText.innerHTML += "ln(" + num1 + ")";
        num1 = Math.log(num1);
        screenText.innerHTML = num1;
    }
};

function fact() {
    secScreenText.innerHTML += "fact(" + num1 + ")";
    let total = 1;
    for (i = 1; i <= num1; i++) {
        total = total * i;
    }
    num1 = total;
    screenText.innerHTML = num1;
};

/* ***************** TECLA DE IGUAL ***************** */

function igualar() {
    if (operator != null && num2 != null) {
        switch (operator) {
            case "+":
                num3 = num2;
                num2 = Number(num2) + Number(num1);
                break;
            case "-":
                num3 = num2;
                num2 = Number(num2) - Number(num1);
                break;
            case "*":
                num3 = num2;
                num2 = Number(num2) * Number(num1);
                break;
            case "/":
                num3 = num2;
                num2 = Number(num2) / Number(num1);
        }
        screenText.innerHTML = num2;
        secScreenText.innerHTML = num3 + operator + num1 + "=";
        operator = null;
    } else {
        console.log("else igualar");
        secScreenText.innerHTML = num1 + "=";
        screenReset = true; // poner la pantalla a 0
    }
};

/* ***************** TECLAS DE CONTROL ***************** */

function retro() {
    if (num1.length > 1 && screenText.innerHTML != "") {
        screenText.innerHTML = screenText.innerHTML.slice(0, num1.length - 1);
        num1 = screenText.innerHTML;
    } else {
        screenText.innerHTML = "0";
        num1 = screenText.innerHTML;
    }
}

function borradoParcial() {
    screenText.innerHTML = "0";
    if (operator == null) {
        secScreenText.innerHTML = "";
    }
}

function borradoTotal() {
    screenText.innerHTML = "0";
    secScreenText.innerHTML = "";
    num1 = null;
    num2 = null;
    operator = null;
}

/* ***************** TECLAS DE MEMORIA ***************** */

function memSav() {
    numMem = num1;
    screenReset = true;
    console.log("mem = " + numMem);
    memoryText.innerHTML = numMem;
}

function memMas() {
    numMem = Number(numMem) + Number(num1);
    console.log("mem = " + numMem);
    memoryText.innerHTML = numMem;
    screenReset = true;
}

function memMenos() {
    numMem = Number(numMem) - Number(num1);
    console.log("mem = " + numMem);
    memoryText.innerHTML = numMem;
    screenReset = true;
}

function memRem() {
    num1 = numMem;
    if (numMem != null) {
        screenText.innerHTML = numMem;
        memoryText.innerHTML = numMem;
    }
    screenReset = true;
    console.log("mem = " + numMem);
};

function memCle() {
    numMem = null;
    console.log("mem = " + numMem);
    memoryText.innerHTML = "";
    screenReset = true;
}

'use strict';
{
let cards = [];
let startTime;
let timer;
let backTimer;
let flgFirst = true;
let cardFirst;
let countUnit = 0;

window.onload = function(){
    let arr = [];
    
    for(let i = 0; i <10; i ++) {
        arr.push(i);
        arr.push(i);
    }
    
    shuffle(arr);
    
    let panel = document.getElementById('panel');
   
    for(let i = 0; i < 20; i++){
        let div = document.createElement('div');
        div.className = 'card back';
        div.index = i;
        div.number = arr [i];
        div.innerHTML = '';
        div.onclick = turn;
        panel.appendChild(div);
        cards.push(div);
    }
    startTime = new Date();
    startTimer();
    
}

function shuffle(arr){
    let n = arr.length;
    let temp, i;

    while(n){
        i = Math.floor(Math.random()* n--);
        temp = arr [n];
        arr [n] = arr [i];
        arr [i] = temp;
    }
    return arr;
}

function turn(e){
    let div = e.target;
    
    if(backTimer)return;

    if(div.innerHTML == '') {
        div.className = 'card';
        div.innerHTML = div.number; 
    } else {
        return;
    }
    

    if(flgFirst){
        cardFirst = div;
        flgFirst = false;
    } else {
        if(cardFirst.number == div.number){
            countUnit ++;
            backTimer = setTimeout(function(){
                div.className = 'card finish';
                cardFirst.className = 'card finish';
                backTimer = NaN;
                
                if(countUnit == 10){
                    clearInterval(timer);
                }
            }, 500);

        } else {  
            backTimer = setTimeout(function() {
                div.className = 'card back';
                div.innerHTML = '';
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }, 500);
        }
        
        flgFirst = true;
    }  
}

function startTimer(){
    timer = setInterval(showSecond, 1000);
}

function showSecond() {
    let nowTime = new Date();
    let elapsedTime = Math.floor( (nowTime-startTime) / 1000);
    let str = '経過時間： ' + elapsedTime + '秒';

    let re = document.getElementById( 'result');
    re.innerHTML = str;
}

}
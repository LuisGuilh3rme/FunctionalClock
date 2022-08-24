
// Clocks
const tradClock = document.querySelector('#traditionalClock');
const clock = document.querySelector("#clock");
const timer = document.querySelector('#timer');

const mHand = document.querySelector('#minutesHand');
const hHand = document.querySelector('#hoursHand');

let clockType = 0;
let reset = 0;

// Digital Clock
setInterval(() => {
    const now = new Date();
    clock.innerHTML = formattedTime(now);
}, 1000);

function formattedTime(now) {
    return `${formattedHour(now.getHours())}:${formattedMinutes(now.getMinutes())}:${formattedSeconds(now.getSeconds())}`
}

function formattedHour(hour) {
    if (hour < 10) return `0${hour}`;
    return hour;
}

function formattedMinutes(minutes) {
    if (minutes < 10) return `0${minutes}`;
    return minutes;
}

function formattedSeconds(seconds) {
    if (seconds < 10) return `0${seconds}`;
    return seconds;
}

//  Change Clock button
const button = document.querySelector('#changeClock');

button.addEventListener('click', () => {
    switchClocks();
});

// Switch clocks
function switchClocks(timerOn) {
    (!timerOn && clockType == 0) ? clockType = 1 : clockType = 0;
    if (timerOn) {
        hideAll();
        return;
    }
    Timer.hideTimer();
    switch (clockType) {
        case 0: clock.hidden = false; tradClock.hidden = true; mHand.hidden = true; hHand.hidden = true; break;
        case 1: clock.hidden = true; tradClock.hidden = false; mHand.hidden = false; hHand.hidden = false; break;
    }
}

function hideAll() {
    clock.hidden = true; 
    tradClock.hidden = true; 
    mHand.hidden = true; 
    hHand.hidden = true;
}

// Traditional Clock
display_clock('src/clock-structure.png', 'Traditional Clock');
display_MinutesHand('src/clock-hand.png', 'Traditional Clock Minutes-hand');
display_HoursHand('src/clock-hand.png', 'Traditional Clock Hours-hand');

function display_clock(src, alt) {
    const a = document.createElement("img");
    a.src = src;
    a.width = 250;
    a.height = 250;
    a.alt = alt;
    tradClock.appendChild(a);
    noDrag(a);
}

function display_MinutesHand(src, alt) {
    const a = document.createElement("img");
    a.src = src;
    a.width = 200;
    a.height = 200;
    a.alt = alt;
    mHand.appendChild(a);
    noDrag(a);
    minuteRotate(a);
}

function display_HoursHand(src, alt) {
    const a = document.createElement("img");
    a.src = src;
    a.width = 150;
    a.height = 150;
    a.alt = alt;
    hHand.appendChild(a);
    noDrag(a);
    hourRotate(a);
}

function noDrag(image) {
    image.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
}

function hourRotate(image) {
    setInterval(() => {
        const now = new Date();
        const total = (now.getMinutes() / 60) + (now.getHours());
        const rotate = 30 * total;
        image.style.transform = `rotate(${rotate}deg)`;
    }, 1000);
}

function minuteRotate(image) {
    setInterval(() => {
        const now = new Date();
        const rotate = 6 * now.getMinutes();
        image.style.transform = `rotate(${rotate}deg)`;
    }, 1000);
}

// Timer
const timerChange = document.querySelector("#changeTimer");
const tempStart = document.querySelector("#tempStart");
const tempStop = document.querySelector("#tempStop");
let temp, previousTemp, tempType = 0;

timerChange.addEventListener('click', () => {
    if (reset == 1) {
        switchClocks();
        return;
    }
    switchClocks(true);
    Timer.showTimer();
    reset++;
});

tempStart.addEventListener('click', () => {
    if (tempType == 0) {
        Timer.beginTimer();
        tempStart.innerHTML = 'START';
        tempType = 1;
    }
    if (tempType == 1) {
        tempStart.innerHTML = 'RESET';
        Timer.beginTimer();
    }
    if (tempType == 2) {
        tempStop.innerHTML = 'STOP';
        tempStart.innerHTML = 'RESET';
        Timer.beginTimer(previousTemp[0], previousTemp[1], previousTemp[2]);
        tempType = 1;
    }
});

tempStop.addEventListener('click', () => {
    if (tempType == 2) {
        
    }
    Timer.stopTimer();
    tempStart.innerHTML = 'CONTINUE';
    tempStop.innerHTML = 'CLEAR';
    tempType = 2;
})

class Timer {
    static showTimer() {
        tempStart.hidden = false;
        tempStop.hidden = false;
        timer.hidden = false;
    }

    static hideTimer() {
        timer.hidden = true;
        tempStart.hidden = true;
        tempStop.hidden = true;
        reset = 0;
    }
    
    static beginTimer (second = 0, minute = 0, hour = 0) {
        if (tempType != 2) this.stopTimer();
        const timerNow = [0, 0, 0];
        temp = setInterval(() => {
            second++;
            timer.innerHTML = this.formattedTimer(second, minute, hour, timerNow);
        }, 1000);
    }

    static stopTimer () {
        clearInterval(temp);
    }

    static formattedTimer(second, minute, hour, hourArray) {
        if (second < 10) hourArray[2] = '0' + second;
        else hourArray[2] = second;

        if (hourArray[2] == 60) {
            hourArray[2] = '00';
            second = 0;
            hourArray[2] = 0;
            minute++;
        }

        if (minute < 10) hourArray[1] = '0' + minute;
        else hourArray[1] = minute;

        if (hourArray[1] == 60) {
            hourArray[1] = '00';
            minute = 0;
            hourArray[1] = 0;
            hour++;
        }

        if (hour < 10) hourArray[0] = '0' + hour;
        else hourArray[0] = hour;
        previousTemp = [second, minute, hour];
        return `${hourArray[0]}:${hourArray[1]}:${hourArray[2]}`;
    }
}
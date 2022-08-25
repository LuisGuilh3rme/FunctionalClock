
// Clocks
const tradClock = document.querySelector('#traditionalClock');
const clock = document.querySelector("#clock");
const stopwatch = document.querySelector('#stopWatch');

const mHand = document.querySelector('#minutesHand');
const hHand = document.querySelector('#hoursHand');

let clockType = 0;
let reset = 0;
let now;

function TimeNow() { now = new Date() };

// Digital Clock
setInterval(() => {
    TimeNow();
    clock.innerHTML = formattedTime(now);
}, 0, 1000);

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
function switchClocks(stopwatchOn) {
    if (!stopwatchOn) (clockType == 0) ? clockType = 1 : clockType = 0;
    if (stopwatchOn) {
        hideAll();
        return;
    }
    Stopwatch.hideStopWatch();
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
    a.width = 230;
    a.height = 200;
    a.alt = alt;
    mHand.appendChild(a);
    noDrag(a);
    minuteRotate(a);
}

function display_HoursHand(src, alt) {
    const a = document.createElement("img");
    a.src = src;
    a.width = 170;
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
        const total = (now.getMinutes() / 60) + (now.getHours());
        const rotate = 30 * total;
        image.style.transform = `rotate(${rotate}deg)`;
    }, 0, 1000);
}

function minuteRotate(image) {
    setInterval(() => {
        const rotate = (6 * (now.getMinutes() + now.getSeconds()/60));
        image.style.transform = `rotate(${rotate}deg)`;
    }, 0, 1000);
}

// stopwatch
const stopwatchChange = document.querySelector("#changestopwatch");
const tempStart = document.querySelector("#tempStart");
const tempStop = document.querySelector("#tempStop");
let temp, previousTemp, tempType = 0;

stopwatchChange.addEventListener('click', () => {
    if (reset == 1) {
        switchClocks();
        switchClocks();
        return;
    }
    switchClocks(true);
    Stopwatch.showStopWatch();
    reset++;
});

tempStart.addEventListener('click', () => {
    if (tempType == 0) {
        Stopwatch.startStopwatch();
        tempType = 1;
    }
    if (tempType == 1) {
        Stopwatch.startStopwatch();
        tempStart.innerHTML = 'RESET';
    }
    if (tempType == 2) {
        tempStop.innerHTML = 'STOP';
        tempStart.innerHTML = 'RESET';
        Stopwatch.startStopwatch(previousTemp[0], previousTemp[1], previousTemp[2], previousTemp[3]);
        tempType = 1;
    }
});

tempStop.addEventListener('click', () => {
    Stopwatch.stopStopwatch();
    if (tempType == 2) {
        tempStart.innerHTML = 'START';
        tempStop.innerHTML = 'STOP';
        Stopwatch.clear();
        return;
    }
    tempStart.innerHTML = 'CONTINUE';
    tempStop.innerHTML = 'CLEAR';
    tempType = 2;
})

class Stopwatch {
    static showStopWatch() {
        tempStart.hidden = false;
        tempStop.hidden = false;
        stopwatch.hidden = false;
    }

    static hideStopWatch() {
        stopwatch.hidden = true;
        tempStart.hidden = true;
        tempStop.hidden = true;
        reset = 0;
    }
    
    static startStopwatch (millisecond = 0, second = 0, minute = 0, hour = 0) {
        if (tempType != 2) this.stopStopwatch();
        const stopwatchNow = [0, 0, 0, 0];
        temp = setInterval(() => {
            (millisecond > 99) ? millisecond = 0 : millisecond++;
            if (millisecond < 10) stopwatchNow[3] = '0' + millisecond;
            else stopwatchNow[3] = millisecond;

            if (millisecond == 100) {
                stopwatchNow[3] = '00';
                second++;
            }
            
            (second < 10) ? stopwatchNow[2] = '0' + second : stopwatchNow[2] = second;

            if (second > 59) {
                second = 0;
                stopwatchNow[2] = '00';
                minute++;
            }

            (minute < 10) ? stopwatchNow[1] = '0' + minute : stopwatchNow[1] = minute;

            if (minute == 60) {
                minute = 0;
                stopwatchNow[1] = '00';
                hour++;
            }

            (hour < 10) ? stopwatchNow[0] = '0' + hour : stopwatchNow[0] = hour;

            previousTemp = [millisecond, second, minute, hour];
            stopwatch.innerHTML = `${stopwatchNow[0]}:${stopwatchNow[1]}:${stopwatchNow[2]}:${stopwatchNow[3]}`;
        }, 10);
    }

    static stopStopwatch () {
        clearInterval(temp);
    }

    static clear() {
        stopwatch.innerHTML = '00:00:00:00';
        tempStart.innerHTML = 'START';
        tempType = 1;
    }
}
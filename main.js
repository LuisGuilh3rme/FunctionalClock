
// Clocks
const tradClock = document.querySelector('#traditionalClock');
const clock = document.querySelector("#clock");

let clockType = 0;
tradClock.hidden = true;

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
const button = document.querySelector('.changeClock');

button.addEventListener('click', () => {
    switchClocks();
});

// Switch clocks
function switchClocks () {
    if (clockType == 0) clockType = 1;
    else clockType = 0;

    switch (clockType) {
        case 1: clock.hidden = false; tradClock.hidden = true; break;
        case 2: clock.hidden = true; tradClock.hidden = false; break;
    }
}

// Traditional Clock
display_image('src/clock-structure.png', 'JavaScriptImage');

function display_image(src, alt) {
    const a = document.createElement("img");
    a.src = src;
    a.width = 100;
    a.height = 100;
    a.alt = alt;
    tradClock.appendChild(a);
}
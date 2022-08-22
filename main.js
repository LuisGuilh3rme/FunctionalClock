
// Clocks
const tradClock = document.querySelector('#traditionalClock');
const clock = document.querySelector("#clock");

const mHand = document.querySelector('#minutesHand');
const hHand = document.querySelector('#hoursHand');

let clockType = 0;

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
    clockType == 0 ? clockType = 1 : clockType = 0;
    switch (clockType) {
        case 0: clock.hidden = false; tradClock.hidden = true; mHand.hidden = true; hHand.hidden = true; break;
        case 1: clock.hidden = true; tradClock.hidden = false; mHand.hidden = false; hHand.hidden = false; break;
    }
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
    setInterval(minuteRotate(a),1000);
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
    setInterval(hourRotate(a), 1000);
}

function noDrag (image) {
    image.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
}

function hourRotate (image) {
    const now = new Date ();
    const total = (now.getMinutes()/60) + (now.getHours());
    const rotate = 30*total;
    image.style.transform = `rotate(${rotate}deg)`;
}

function minuteRotate (image) {
    const now = new Date ();
    const rotate = 6*now.getMinutes();
    image.style.transform = `rotate(${rotate}deg)`;
}
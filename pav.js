let periodsAttendedButton = document.querySelector(".b1");
var periodsPresent;
var totalPeriods;
var leaves = [];
var period;
var holidays = [];
periodsAttendedButton.addEventListener("click", () => {
    periodsPresent = 0;
    totalPeriods = 0;
    const statusContainer = document.querySelector(".status");
    statusContainer.innerHTML = "";
    let ans1 = document.getElementById('inp1').value;
    let ans2 = document.getElementById('inp2').value;
    let inputString1 = document.getElementById('inp3').value;
    let inputString2 = document.getElementById('inp4').value;
    if (!ans1 || !ans2) {
        alert("fill all the details")
        return;
    }
    periodsPresent = parseInt(ans1, 10) || 0;
    totalPeriods = parseInt(ans2, 10) || 0;

    leaves = inputString1.split(" ").map(Number).filter(n => !isNaN(n));

    holidays = inputString2.split(" ").map(Number).filter(n => !isNaN(n));

    period = parseInt(document.getElementsByClassName("custom-select")[0].value, 10);

    const now = new Date();
    const sundays = getSundays(now);
    const sun = sundays.map(sunday => sunday.getDate());
    const pres = now.getDate();
    const isRadioSelected = document.getElementById('singleRadio').checked;
    bool = isRadioSelected ? true : false;
    if (bool === true) {
        holidays.push(pres);
    }
    attendenceCalculator(holidays, leaves, 28, periodsPresent, totalPeriods, pres, sun, period);
});


let reset = document.querySelector(".b2");
reset.addEventListener("click", () => {
    document.getElementById('inp1').value = '';
    document.getElementById('inp2').value = '';
    document.getElementById('inp3').value = '';
    document.getElementById('inp4').value = '';
    const statusContainer = document.querySelector(".status");
    statusContainer.innerHTML = "";
    periodsPresent = 0;
    totalPeriods = 0;
    leaves = [];
    holidays = [];
});

function get_Date() {
    const now = new Date()
    return now.getDate();
}
function getSundays(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const startDate = date.getDate();

    let sundays = [];
    let cnt = 4;

    let cdate = new Date(year, month, startDate);
    while (cdate.getMonth() === month && cnt > 0) {
        if (cdate.getDay() === 0) {
            sundays.push(new Date(cdate));
            cnt = cnt - 1;
        }
        cdate.setDate(cdate.getDate() + 1);
    }
    let date2 = new Date(year, month + 1, 1);
    while (date2.getMonth() === month + 1 && cnt > 0) {
        if (date2.getDay() === 0) {
            sundays.push(new Date(date2));
            cnt = cnt - 1;
        }
        date2.setDate(date2.getDate() + 1);
    }
    return sundays;
}
function sundaysmain() {
    return sun;
}

function getMaxDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}


function attendenceCalculator(holidays, leaves, n, periodsPresent, totalPeriods, date, sun, period) {
    let attendence = 0;
    let now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();
    let maxDaysInMonth = getMaxDaysInMonth(currentMonth, currentYear);
    for (let i = date; i < date + n; i++) {
        let currentDay = i;
        let currentMonthUpdated = currentMonth;
        if (currentDay > maxDaysInMonth) {
            currentDay = currentDay - maxDaysInMonth; 
            maxDaysInMonth = getMaxDaysInMonth(currentMonthUpdated, currentYear);
        }

        if (absentChecker(leaves, currentDay, period)) {
            totalPeriods += period;
            attendence = attendencePerform(periodsPresent, totalPeriods);
            getStatus(currentDay, attendence, true);
        }
        else if (holidayChecker(holidays, currentDay)) continue;
        else if (sundayChecker(sun, currentDay)) continue;
        else {
            periodsPresent += period;
            totalPeriods += period;
            attendence = attendencePerform(periodsPresent, totalPeriods);
            getStatus(currentDay, attendence, false);
        }
    }
}
function restrictToNumbers(event) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
}

function restrictToNumbersWithSpace(event) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9\s]/g, ''); 
}

function dateOptimizer(date) {
    return date % 31;
}
function holidayChecker(holidays, date) {
    return holidays.includes(date);
    
}
function sundayChecker(sun, date) {
    return sun.includes(date);
}
function absentChecker(leaves, date) {
    return leaves.includes(date);
}
function getStatus(date, attendence, absent) {
    const state = absent ? "A" : "P";
    createBar(state, date, attendence);
}
function attendencePerform(periodsPresent, totalPeriods) {
    let attendance = (periodsPresent / totalPeriods) * 100;
    return Math.floor(attendance * 100) / 100;
}
function createBar(state, date, attendence) {
    let access = document.querySelector(".status");
    if (state === "A") {
        const absentDiv = document.createElement("div");
        const stateDiv = document.createElement("div");
        const dateDiv = document.createElement("div");
        const attendenceDiv = document.createElement("div");

        stateDiv.innerHTML = `<p>${state}</p>`;
        dateDiv.innerHTML = `<p>Date: ${date}th</p>`;
        attendenceDiv.innerHTML = `<p>Attendance: ${attendence}%</p>`
        absentDiv.className = "redprint"; 
        stateDiv.className = "stated";
        dateDiv.className = "dated";
        attendenceDiv.className = "attended"
        absentDiv.appendChild(stateDiv);
        absentDiv.appendChild(dateDiv);
        absentDiv.appendChild(attendenceDiv);
        access.appendChild(absentDiv);
    }
    else {
        const presentDiv = document.createElement("div");
        const stateDiv = document.createElement("div");
        const dateDiv = document.createElement("div");
        const attendenceDiv = document.createElement("div");
        stateDiv.innerHTML = `<p>${state}</p>`;
        dateDiv.innerHTML = `<p>Date: ${date}th</p>`;
        attendenceDiv.innerHTML = `<p>Attendance: ${attendence}%</p>`
        presentDiv.className = "blueprint";

        stateDiv.className = "stated";
        dateDiv.className = "dated";
        attendenceDiv.className = "attended"
        presentDiv.appendChild(stateDiv);
        presentDiv.appendChild(dateDiv);
        presentDiv.appendChild(attendenceDiv);
        access.append(presentDiv);
    }
}
document.getElementById('inp1').addEventListener('input', restrictToNumbers);
document.getElementById('inp2').addEventListener('input', restrictToNumbers);
document.getElementById('inp3').addEventListener('input', restrictToNumbersWithSpace);
document.getElementById('inp4').addEventListener('input', restrictToNumbersWithSpace);

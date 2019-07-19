// Scroll function, that scrolls element into view and then adds hash after some time to the url
// =============================================================================================
var links = document.getElementsByClassName("hashlink");
for(link of links) {
    link.addEventListener("click", scrollToSection);
}

function scrollToSection(e) {
    e.preventDefault();
    var href = e.target.hash,
        element = document.getElementById(href.substr(1));
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(function() {window.location.hash = href}, 2000);
}


// Countdown clock functionality
// =============================
startCountdown(document.querySelector("#registrationTimeBlock"), new Date("Aug 25, 2019 17:00:00").getTime());
startCountdown(document.querySelector("#startTimeBlock"), new Date("Sep 3, 2019 09:00:00").getTime());

// Create a function for multi-countdowns on the page, ask for element to show countdown as well as the datetime to countdown to
// =============================================================================================================================
function startCountdown(elem, countDownDate) {
    var countdownInterval = setInterval(function () {
        // Set the different time variables
        var timeNow = new Date().getTime(),
            timeDifference = countDownDate - timeNow;
        days = addLeadingZero(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
        hours = addLeadingZero(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        minutes = addLeadingZero(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));
        seconds = addLeadingZero(Math.floor((timeDifference % (1000 * 60)) / 1000));


        elem.innerHTML = days + " Days and " + hours + ":"
            + minutes + ":" + seconds;

        // If the count down is finished, write some text
        if (timeDifference < 0) {
            clearInterval(x);
            document.querySelector("#registrationTimeBlock").innerHTML = "Registration for `Easley 1` has closed, we'll let you know when the next group will start as soon as possible !";
        }
    }, 1000);
}


// AJAX To send contact form functionality
// =======================================
var submit = document.getElementById("contactSubmit");
submit.addEventListener("click", sendForm);

function sendForm(e) {
    e.preventDefault();

    submit.firstElementChild.classList.toggle("fa-spin");
    submit.firstElementChild.classList.toggle("fa-paper-plane");
    submit.firstElementChild.classList.toggle("fa-spinner");




    window.setTimeout(function() {
        submit.firstElementChild.classList.toggle("fa-spin");
        submit.firstElementChild.classList.toggle("fa-check");
        submit.firstElementChild.classList.toggle("fa-spinner");
    }, 2000);


    window.setTimeout(function() {
        submit.firstElementChild.classList.toggle("fa-check");
        submit.firstElementChild.classList.toggle("fa-paper-plane");
    }, 5000);
}

// Add leading zeros if any number is below 10
// ===========================================
function addLeadingZero(item) {
    if (item < 10) {
        item = "0" + item;
    }

    return item;
}


// iFrame functionality (play youtube videos in the iFrame)
// ========================================================
let songs = document.getElementsByClassName("youtube");
let frame = document.getElementById("frame");

for (song of songs) {
    song.addEventListener("click", function(e) {
        e.preventDefault();
        console.dir(e);
        if (!frame.parentElement.classList.contains("display")) {
            frame.parentElement.classList.add("display")
        }
        frame.setAttribute("src", "https://www.youtube.com/embed/" + e.target.parentElement.hash.slice(1))
        frame.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        window.setTimeout(function() {
            window.location.hash = "#frame";
        })
    })
}
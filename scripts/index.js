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
    animateIcon();

    let nameInput = document.getElementById("fullName"),
        emailInput = document.getElementById("email"),
        messageInput = document.getElementById("message"),
        postData = JSON.stringify({"fullName": nameInput.value, "email": emailInput.value, "message": messageInput.value});

    const request = new XMLHttpRequest();

    request.addEventListener('load', function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
        }
        else {
            console.log("Error code: " + this.status);
        }
    });

    request.open('POST', 'https://genk.becode.xyz/mail/contact_form', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(postData);

}

function animateIcon() {
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




// JS to auto scroll the company logo's in the sponsors section
// ============================================================
var px = 1,
    iterations = 1;
function scroller () {
    var gallery = document.querySelector("#sponsor-row"),
        logos = document.querySelectorAll("#sponsor-row img");

    gallery.classList.toggle("transitioning");
    iterations++;
    window.setTimeout(function() {
        gallery.appendChild(logos[0]);
        gallery.classList.toggle("transitioning");
        window.setTimeout(scroller, 20);
    }, 5001);
}

scroller();





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
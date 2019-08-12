// Client ID and API key from the Developer Console
var CLIENT_ID = "774646318135-a6ep0c0bli552ihua32i4n9ua5qi4630.apps.googleusercontent.com";
var API_KEY = "AIzaSyBHgy3x3E3hy45n2N3iooFn51O2psLVPHQ";


let cal_id = "81u6evmbrf8m97nk0l8ttlrlg0@group.calendar.google.com",
    api_key = "AIzaSyBHgy3x3E3hy45n2N3iooFn51O2psLVPHQ",
    iso_time = ISODateString(new Date());

const request = new XMLHttpRequest();

request.addEventListener('load', function (data) {
    let google_events = JSON.parse(this.response).items;
    console.dir(google_events);
    var google_events_holder = document.getElementById('google-events');
    for (google_event of google_events) {
        var google_event_element = createEvent(google_event);
        google_events_holder.appendChild(google_event_element);
    }


});

request.open('GET', "https://www.googleapis.com/calendar/v3/calendars/" + cal_id + "/events?key=" + api_key + "&singleEvents=true&orderBy=startTime&maxResults=3&timeMin=" + iso_time, true);
request.send();





function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate())+'T'
        + pad(d.getUTCHours())+':'
        + pad(d.getUTCMinutes())+':'
        + pad(d.getUTCSeconds())+'Z'
}

// Add leading zeros if any number is below 10
// ===========================================
function addLeadingZero(item) {
    if (item < 10) {
        item = "0" + item;
    }
    return item;
}


function createEvent(event) {
    // Create elements to set them up for modifications
    // ================================================
    var event_element = document.createElement("div"),
        title_div = document.createElement("div"),
        title = document.createElement("h3"),
        description_div = document.createElement("div"),
        description = document.createElement("p"),
        footer_div = document.createElement("div"),
        footer_link = document.createElement("a"),
        location_span = document.createElement("span");


    // Set up the title content
    // =========================
    title.innerText = event.summary;
    title_div.classList.add("event_title");
    title_div.appendChild(title);


    // Set up the description's content
    // ================================
    location_span.innerHTML = event.location;
    location_span.classList.add("event_location");
    description.innerHTML = event.description;
    description.appendChild(location_span);
    description_div.classList.add("event_description");
    description_div.appendChild(description);


    // Set up the footer's content
    // ===========================
    let gdate = new Date(Date.parse(event.start.dateTime));
    footer_link.innerText = `${addLeadingZero(gdate.getDate())}/${addLeadingZero(gdate.getMonth()+1)}/${addLeadingZero(gdate.getFullYear())} - ${addLeadingZero(gdate.getHours())}:${addLeadingZero(gdate.getMinutes())}`;
    footer_link.href = event.htmlLink;
    footer_link.classList.add("footer_link");
    footer_link.target = "_blank" ;
    footer_link.rel = "noopener noreferrer";
    footer_div.classList.add("event_footer");
    footer_div.appendChild(footer_link);

    // Set up the main event_element's structure and content
    // =====================================================
    event_element.classList.add("event");
    event_element.appendChild(title_div);
    event_element.appendChild(description_div);
    event_element.appendChild(footer_div);
    return event_element;
}
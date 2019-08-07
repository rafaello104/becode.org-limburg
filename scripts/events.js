// Client ID and API key from the Developer Console
var CLIENT_ID = "774646318135-a6ep0c0bli552ihua32i4n9ua5qi4630.apps.googleusercontent.com";
var API_KEY = "AIzaSyBHgy3x3E3hy45n2N3iooFn51O2psLVPHQ";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        addEvents(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'none';
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function noEvents(message) {
    var events = document.getElementById('google-events');
    var textContent = document.createTextNode(message + '\n');
    events.appendChild(textContent);
}

function addEvents(event) {
    var events = document.getElementById('google-events');
    var event_element = createEvent(event);
    events.appendChild(event_element);
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
        footer_link = document.createElement("a");


    // Set up the title content
    // =========================
    title.innerText = event.summary;
    title_div.classList.add("event_title");
    title_div.appendChild(title);


    // Set up the description's content
    // ================================
    description.innerText = event.description;
    description_div.classList.add("event_description");
    description_div.appendChild(description);


    // Set up the footer's content
    // ===========================
    footer_link.innerText = event.location;
    footer_link.href = event.htmlLink;
    footer_link.classList.add("footer_link");
    footer_div.classList.add("event_footer");
    footer_div.appendChild(footer_link);

    // Set up the main event_element's structure and content
    // =====================================================
    event_element.classList.add("event");
    event_element.appendChild(title_div);
    event_element.appendChild(description_div);
    event_element.appendChild(footer_div);

    console.dir(event);
    return event_element;
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': '81u6evmbrf8m97nk0l8ttlrlg0@group.calendar.google.com',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 3,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;

        if (events.length > 0) {
            for (i = 0; i < 3; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                addEvents(event);
            }
        } else {
            noEvents('No upcoming events found.');
        }
    });
}
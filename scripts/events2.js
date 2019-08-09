// Client ID and API key from the Developer Console
var CLIENT_ID = "774646318135-a6ep0c0bli552ihua32i4n9ua5qi4630.apps.googleusercontent.com";
var API_KEY = "AIzaSyBHgy3x3E3hy45n2N3iooFn51O2psLVPHQ";


let cal_id = "81u6evmbrf8m97nk0l8ttlrlg0@group.calendar.google.com",
    api_key = "AIzaSyBHgy3x3E3hy45n2N3iooFn51O2psLVPHQ",
    iso_time = ISODateString(new Date());

const request = new XMLHttpRequest();

request.addEventListener('load', function (data) {
    let events = JSON.parse(this.response);
    console.dir(events);
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

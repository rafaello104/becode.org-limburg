var desktop_scripts = [
    "./scripts/flipclock.min.js",
    "./scripts/events2.js",
    "./scripts/index.js"
];

var mobile_scripts = [
    "./scripts/events2.js",
    "./scripts/index.js"
];

var desktop_stylesheets = [
    "./css/plugins/flip-clock/flipclock.min.css"
];

function isMobileDevice(){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth*window.devicePixelRatio <= 960
        && window.innerHeight*window.devicePixelRatio <= 640)) {
        return true;
    }
    else {
        return false;
    }
}

function write_scripts(scripts) {
    let head = document.getElementsByTagName("head")[0];
    let comment = document.createComment("Dynamically added scripts");
    head.appendChild(comment);
    for (src of scripts) {
        let script_tag = document.createElement("script");
        script_tag.type = "text/javascript";
        script_tag.src = src;
        script_tag.setAttribute("defer", "defer");
        head.appendChild(script_tag);
    }
}

function write_stylesheets(sheets) {
    let head = document.getElementsByTagName("head")[0];
    for (sheet of sheets) {
        let stylesheet_tag = document.createElement("link");
        stylesheet_tag.rel = "stylesheet";
        stylesheet_tag.href = sheet;
        stylesheet_tag.type = "text/css";
        head.insertBefore(stylesheet_tag, head.childNodes[0]);
    }
    let comment = document.createComment("Dynamically added stylesheets");
    head.insertBefore(comment, head.childNodes[0]);
}

if (!isMobileDevice()){
    // Desktop
    // =======
    write_scripts(desktop_scripts);
    write_stylesheets(desktop_stylesheets);
}
else {
    // Mobile
    // ======
    write_scripts(mobile_scripts);
}


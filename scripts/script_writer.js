var desktop_scripts = [
    "./scripts/jquery.min.js",
    "./scripts/flipclock.min.js",
    "./scripts/events2.js",
    "./scripts/index.js"
];

var mobile_scripts = [
    "./scripts/events2.js",
    "./scripts/index.min.js"
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
    for (src of scripts) {
        let script_tag = document.createElement("script");
        script_tag.type = "text/javascript";
        script_tag.src = src;
        script_tag.setAttribute("defer", "defer");
        head.appendChild(script_tag);
    }
}

if (!isMobileDevice()){
    // Desktop
    // =======
    write_scripts(desktop_scripts);
}
else {
    // Mobile
    // ======
    write_scripts(desktop_scripts);
}


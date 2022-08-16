console.log("Trying to register our service worker");

if (navigator.serviceWorker) {
    console.log("Service worker is supported");
    window.addEventListener("load", function () {
        console.log("window is loaded");
        navigator.serviceWorker.register("/sw_network1.js").then(register => {
            console.log("Service worker registered successfuly: ", register);
        })
    })
} else {
    console.log("Service worker is not supported");
}
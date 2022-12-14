const CACHE_NAME = "pwa_day_1";
const urlsToCache = [
    "/",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("Cache opened!");
            return cache.addAll(urlsToCache);
        })
    )
});


self.addEventListener("fetch", async (event) => {
    event.respondWith((async () => {
        try {
            const serverResponse = await fetch(event.request);
            if (serverResponse) {
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.add(event.request.url).then(() => {
                    }).catch(console.error);
                });
                return serverResponse;
            }
        } catch (e) {
            const cachedResponse = await caches.match(event.request);
            return cachedResponse;
        }


    })())

});


self.addEventListener("message", function (message) {
    console.log(message);
})
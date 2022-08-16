const CACHE_NAME = "pwa_day_1";
const urlsToCache = [
    "/",
];

self.addEventListener("install", function (event) {
    console.log("[Service worker] Install");
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("Cache opened!");
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener("activate", function (event) {
    console.log("[Service worker] Activate");
})


self.addEventListener("fetch", async (event) => {
    event.respondWith((async () => {
        const cachedResponse = await caches.match(event.request);

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
            const client = await clients.get(event.clientId);
            if (client) {
                client.postMessage({
                    group: "network",
                    status: 0
                })
            }

        }

        return cachedResponse;

    })())






});


self.addEventListener('push', (e) => {
    const data = e.data;
    console.log(data)
    self.registration.showNotification("data", {
        body: "hello",

    });
});
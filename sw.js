const CACHE_NAME = "coseno-cache-v1"; 
const urlsToCache = [   
    "./",   
    "./index.html",   
    "./galeria.html",   
    "./faq.html",   
    "./manifest.json",   
    "./icon-192.png",   
    "./icon-512.png",   
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",   
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
];

self.addEventListener("install", (event) => {   
    event.waitUntil(     
        caches.open(CACHE_NAME).then((cache) => {       
            return cache.addAll(urlsToCache);     
        })   
    ); 
});
self.addEventListener("activate", (event) => {   
    event.waitUntil(     
        caches.keys().then((cacheNames) =>       
            Promise.all(         
                cacheNames.map((cacheName) => {           
                    if (cacheName !== CACHE_NAME) {             
                        return caches.delete(cacheName);           
                    }         
                })       
            )     
        )   
    ); 
});
self.addEventListener("fetch", (event) => {   
    event.respondWith(     
        caches.match(event.request).then((response) => {       
            return response || fetch(event.request);     
        })   
    ); 
});
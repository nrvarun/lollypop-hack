console.log('Service worker has started');

let CACHE_NAME = 'Lollypop-v1';
let urlsToCache = [
  '/',
  '/styles/style.css',
  '/script/bundle.js',
  '/assets/avatar.png',
  '/assets/others1.png',
  '/assets/others2.png',
  '/assets/others3.png',
  '/assets/others4.png',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
  'https://fonts.gstatic.com/s/robotoslab/v6/y7lebkjgREBJK96VQi37Zo4P5ICox8Kq3LLUNMylGO4.woff2',
  'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2',
  'https://fonts.googleapis.com/css?family=Roboto+Slab|Roboto:300,400,700'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  console.log('install event commenced');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(()=>{
        console.log('Installation successful');
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        let fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            let responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});



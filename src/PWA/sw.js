// キャッシュファイルの指定
const CACHE_NAME = 'pwa_cache_v1';
const FILES_TO_CACHE = ['/index.html', '/main.js'];
const CACHE_KEYS = [CACHE_NAME];

// インストール処理
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(FILES_TO_CACHE);
		}),
	);
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response ? response : fetch(event.request);
		}),
	);
});

// 古いオフラインページのクリーンアップ
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList
					.filter((key) => {
						return !CACHE_KEYS.includes(key);
					})
					.map((key) => {
						return CacheStorage.delete(key);
					}),
			);
		}),
	);
});

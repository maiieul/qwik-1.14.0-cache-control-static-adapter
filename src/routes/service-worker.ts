/*
 * WHAT IS THIS FILE?
 *
 * The service-worker.ts file is used to have state of the art prefetching.
 * https://qwik.dev/qwikcity/prefetching/overview/
 *
 * Qwik uses a service worker to speed up your site and reduce latency, ie, not used in the traditional way of offline.
 * You can also use this file to add more functionality that runs in the service worker.
 */
import { setupServiceWorker } from "@builder.io/qwik-city/service-worker";

setupServiceWorker();

addEventListener("install", () => self.skipWaiting());

addEventListener("activate", () => self.clients.claim());

const putInCache = async (request: RequestInfo | URL, response: Response) => {
  const cache = await caches.open("NAME");
  await cache.put(request, response);
};
const cacheFirst = async (request: RequestInfo | URL, event: FetchEvent) => {
  const fromCache = await caches.match(request);
  if (fromCache) return fromCache;
  const fromNetwork = await fetch(request);
  event.waitUntil(putInCache(request, fromNetwork.clone()));
  return fromNetwork;
};
self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request, event));
});

declare const self: ServiceWorkerGlobalScope;

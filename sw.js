const CACHE_NAME = 'bomber-v1';

self.addEventListener('install', event => {
    console.log('💣 Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('💣 Service Worker activated');
    event.waitUntil(clients.claim());
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    // Open or focus the app
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(clientList => {
                if (clientList.length > 0) {
                    return clientList[0].focus();
                }
                return clients.openWindow('/');
            })
    );
});

// Background sync for persistent bombing
self.addEventListener('sync', event => {
    if (event.tag === 'bomb-sync') {
        event.waitUntil(sendBackgroundNotification());
    }
});

// Push notifications (for future use)
self.addEventListener('push', event => {
    const data = event.data?.json() || {
        title: '💣 BOMBER',
        body: 'Background notification!'
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ff0000\'/%3E%3C/svg%3E',
            badge: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ff0000\'/%3E%3C/svg%3E',
            vibrate: [500, 200, 500],
            requireInteraction: true
        })
    );
});

// Helper for background notifications
async function sendBackgroundNotification() {
    await self.registration.showNotification('💣 Background Bomber', {
        body: 'Still active!',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ff0000\'/%3E%3C/svg%3E',
        requireInteraction: true
    });
}
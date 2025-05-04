importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

// Ta sama konfiguracja co w main.js
const firebaseConfig = {
  apiKey: "AIzaSyB3ZH52EDIJPTl5x8lYRYcx6WeFytDZsrM",
  authDomain: "travel-pwa-6de80.firebaseapp.com",
  projectId: "travel-pwa-6de80",
  storageBucket: "travel-pwa-6de80.firebasestorage.app",
  messagingSenderId: "52650117169",
  appId: "1:52650117169:web:e1b01ed75f8156dec32d10"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Pokazuj automatycznie powiadomienia w tle
messaging.onBackgroundMessage((payload) => {
  console.log('Otrzymano powiadomienie w tle:', payload);
  
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/lista3/images/logo.png' // Poprawiony path
  });
});
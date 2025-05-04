// main.js - użyj Firebase SDK bez własnego service worker

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3ZH52EDIJPTl5x8lYRYcx6WeFytDZsrM",
  authDomain: "travel-pwa-6de80.firebaseapp.com",
  projectId: "travel-pwa-6de80",
  storageBucket: "travel-pwa-6de80.firebasestorage.app",
  messagingSenderId: "52650117169",
  appId: "1:52650117169:web:e1b01ed75f8156dec32d10"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// NIE REJESTRUJ WŁASNEGO SERVICE WORKER
// Firebase używa domyślnego

window.addEventListener('load', async () => {
  try {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      // Pobierz token - Firebase automatycznie użyje domyślnego SW
      const token = await getToken(messaging, {
        vapidKey: 'BKOQHHslsNxzSG5OhYT4yNvo5vRztXB0F3KxepBH0YWR6glic0xjQ3qNxytWr2-s5yWh0C4GwWE4sZc5cLcrU3U'
      });
      
      console.log('Token FCM:', token);
      
      // Token będzie pokazany w konsoli - skopiuj go
      // i użyj go w konsoli Firebase do wysyłania powiadomień
    }
  } catch (error) {
    console.error('Błąd:', error);
  }
});
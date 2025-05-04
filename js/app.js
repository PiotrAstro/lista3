// main.js - tylko kod Firebase (import module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";

// Twoja konfiguracja Firebase z konsoli
const firebaseConfig = {
  apiKey: "AIzaSyB3ZH52EDIJPTl5x8lYRYcx6WeFytDZsrM",
  authDomain: "travel-pwa-6de80.firebaseapp.com",
  projectId: "travel-pwa-6de80",
  storageBucket: "travel-pwa-6de80.firebasestorage.app",
  messagingSenderId: "52650117169",
  appId: "1:52650117169:web:e1b01ed75f8156dec32d10"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/lista3/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Firebase SW zarejestrowany');
    })
    .catch((err) => {
      console.log('Błąd rejestracji Firebase SW:', err);
    });
}

// Auto-subskrypcja przy załadowaniu strony
window.addEventListener('load', async () => {
  try {
    // Poproś o pozwolenie
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      // Pobierz token
      const token = await getToken(messaging, {
        vapidKey: 'BKOQHHslsNxzSG5OhYT4yNvo5vRztXB0F3KxepBH0YWR6glic0xjQ3qNxytWr2-s5yWh0C4GwWE4sZc5cLcrU3U'
      });
      
      console.log('Token FCM:', token);
      // Skopiuj ten token, aby użyć go w konsoli Firebase
    }
  } catch (error) {
    console.error('Błąd:', error);
  }
});

// Obsługa powiadomień w aktywnej aplikacji
onMessage(messaging, (payload) => {
  console.log('Otrzymano powiadomienie:', payload);
});
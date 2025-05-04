// Funkcja uruchamiająca się po załadowaniu strony

 
window.onload = () => {
    'use strict';
    
    // Rejestracja Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker registered successfully.'))
      .catch((error) => console.error('Service Worker registration failed:', error));
        
      // Obsługa zmian online/offline
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
      
      // Początkowe sprawdzenie statusu
      updateOnlineStatus();
    }
    
    // Inicjalizacja nawigacji
    initializeNavigation();
    
    // Obsługa formularza newslettera
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
  };
  
  // Funkcja aktualizująca status online/offline
  function updateOnlineStatus() {
    const offlineMessage = document.getElementById('offline-message');
    console.log('Sprawdzam status online/offline');
    if (offlineMessage) {
      if (!navigator.onLine) {
        console.log('Offline mode activated');
        offlineMessage.classList.remove('hidden');
      } else {
        console.log('Online mode activated');
        offlineMessage.classList.add('hidden');
      }
    }
  }
  
  // Funkcja inicjalizująca nawigację
  function initializeNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Obsługa kliknięcia w przycisk menu
    if (burger) {
      burger.addEventListener('click', () => {
        // Przełączanie widoczności menu
        nav.classList.toggle('nav-active');
        
        // Animacja ikonki menu (burger)
        burger.classList.toggle('toggle');
        
        // Animacja dla linków
        navLinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = '';
          } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
          }
        });
      });
    }
    
    // Obsługa kliknięcia na link nawigacyjny
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const pageName = event.target.dataset.page;
        if (pageName) {
          loadPage(pageName);
          
          // Zamknięcie menu na mobilnej wersji
          if (nav && nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
          }
          
          // Ustawienie aktywnego linku
          document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
          });
          event.target.classList.add('active');
        }
      });
    });
    
    // Obsługa przycisków w sekcjach
    document.querySelectorAll('.btn[data-page]').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const pageName = event.target.dataset.page;
        if (pageName) {
          loadPage(pageName);
        }
      });
    });
  }
  
  // Funkcja obsługująca formularz newslettera
  function handleNewsletterSubmit(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Tutaj można dodać kod do zapisania emaila do bazy danych
    console.log('Zapisano email do newslettera:', email);
    
    // Czyszczenie pola formularza
    emailInput.value = '';
    
    // Wyświetlenie potwierdzenia
    alert('Dziękujemy za zapisanie się do newslettera!');
  }
  
  // Funkcja ładująca zawartość stron
  function loadPage(pageName) {
    let contentUrl = '';
    
    switch(pageName) {
      case 'home':
        location.reload();
        return;
      case 'camino':
        contentUrl = '/lista3/pages/camino.html';
        break;
      case 'colombia':
        contentUrl = '/lista3/pages/colombia.html';
        break;
      case 'about':
        contentUrl = '/lista3/pages/about.html';
        break;
      default:
        contentUrl = '/lista3/index.html';
    }
    console.log('Ładowanie strony:', contentUrl);
    fetch(contentUrl)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Nie udało się załadować strony');
      })
      .then(html => {
        // Wczytanie treści do kontenera
        const content = document.getElementById('content');
        if (content) {
          content.innerHTML = html;
          
          // Przewinięcie do góry strony
          window.scrollTo(0, 0);
          
          // Aktualizacja tytułu strony
          if (pageName !== 'home') {
            document.title = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} - TravelPWA`;
          } else {
            document.title = 'TravelPWA - Podróże rowerem';
          }
          
          // Aktywacja skryptów w nowo załadowanej treści
          const scripts = content.querySelectorAll('script');
          scripts.forEach(script => {
            const newScript = document.createElement('script');
            
            if (script.src) {
              newScript.src = script.src;
            } else {
              newScript.textContent = script.textContent;
            }
            
            document.body.appendChild(newScript);
            document.body.removeChild(newScript);
          });
        }
      })
      .catch(error => {
        console.error('Błąd podczas ładowania strony:', error);
        const content = document.getElementById('content');
        if (content) {
          content.innerHTML = `
            <div class="error-container">
              <h2>Ups! Coś poszło nie tak.</h2>
              <p>Nie udało się załadować żądanej strony. Sprawdź połączenie z internetem lub spróbuj ponownie później.</p>
              <button class="btn" onclick="location.reload()">Spróbuj ponownie</button>
            </div>
          `;
        }
      });
  }




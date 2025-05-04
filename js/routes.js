// Obsługa historii przeglądarki dla nawigacji w aplikacji
(function() {
    'use strict';
    
    // Reagowanie na zmiany w historii przeglądarki
    window.addEventListener('popstate', handlePopState);
    
    // Funkcja obsługująca zdarzenia historii przeglądarki
    function handlePopState(event) {
      if (event.state && event.state.page) {
        loadPage(event.state.page);
        
        // Aktualizacja aktywnego linku
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.dataset.page === event.state.page) {
            link.classList.add('active');
          }
        });
      }
    }
    
    // Rozszerzenie funkcji ładowania strony o obsługę historii
    const originalLoadPage = window.loadPage;
    
    window.loadPage = function(pageName) {
      // Aktualizacja historii przeglądarki
      if (pageName !== 'home') {
        history.pushState({ page: pageName }, `${pageName} - Podróże Piotra`, `#${pageName}`);
      } else {
        history.pushState({ page: 'home' }, 'Podróże Piotra Zatwarinckiego', '/');
      }
      
      // Wywołanie oryginalnej funkcji ładowania strony
      if (typeof originalLoadPage === 'function') {
        originalLoadPage(pageName);
      }
    };
    
    // Inicjalizacja strony na podstawie hashtagu w URL
    function initializeFromUrl() {
      const hash = window.location.hash.substring(1);
      
      if (hash && ['camino', 'colombia', 'about'].includes(hash)) {
        loadPage(hash);
        
        // Ustawienie aktywnego linku
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.dataset.page === hash) {
            link.classList.add('active');
          }
        });
      } else {
        // Inicjalizacja stanu historii dla strony głównej
        history.replaceState({ page: 'home' }, 'Podróże Piotra Zatwarinckiego', '/');
      }
    }
    
    // Wywołanie inicjalizacji po załadowaniu dokumentu
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeFromUrl);
    } else {
      initializeFromUrl();
    }
  })();
'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    // Désactive la restauration automatique du scroll par le navigateur
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force le scroll en haut à l'arrivée sur la page
    window.scrollTo(0, 0);
  }, []);

  return null;
}
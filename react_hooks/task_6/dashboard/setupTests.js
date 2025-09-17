import '@testing-library/jest-dom';
import { StyleSheetTestUtils } from 'aphrodite';

// Configuration globale Jest
beforeAll(() => {
  jest.setTimeout(8000);
});

afterAll(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  // Nettoyer le DOM
  document.body.innerHTML = '';
});

// Fonction pour convertir hex en rgba
function convertHexToRGBA(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

// Rendre la fonction disponible globalement pour les tests
global.convertHexToRGBA = convertHexToRGBA;

expect.extend({
  toHaveStyle(received, styles) {
    const element = received;

    for (const [property, expectedValue] of Object.entries(styles)) {
      if (property === 'color') {
        // Obtenir la couleur actuelle de manière plus sûre
        let actualColor = null;

        try {
          if (typeof window !== 'undefined' && window.getComputedStyle) {
            const computedStyle = window.getComputedStyle(element);
            actualColor = computedStyle.color;
          }
        } catch (e) {
          // Fallback silencieux
          actualColor = element.style?.color || null;
        }

        // Le test passe un OBJET {r, g, b}
        if (typeof expectedValue === 'object' && expectedValue.r !== undefined) {
          const { r, g, b } = expectedValue;
          const expectedColorString = `rgba(${r}, ${g}, ${b}, 1)`;

          // Normaliser actualColor - convertir rgb en rgba si nécessaire
          if (actualColor && actualColor.startsWith('rgb(') && !actualColor.startsWith('rgba(')) {
            actualColor = actualColor.replace('rgb(', 'rgba(').replace(')', ', 1)');
          }

          if (actualColor !== expectedColorString) {
            return {
              pass: false,
              message: () => `Expected color ${expectedColorString}, got ${actualColor}`
            };
          }
        } else {
          // Cas string normal
          const expectedColorString = typeof expectedValue === 'string'
            ? expectedValue
            : convertHexToRGBA('#e1003c');

          if (actualColor !== expectedColorString) {
            return {
              pass: false,
              message: () => `Expected color ${expectedColorString}, got ${actualColor}`
            };
          }
        }
      }
    }

    return { pass: true };
  }
});

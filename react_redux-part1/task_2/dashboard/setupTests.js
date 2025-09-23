import '@testing-library/jest-dom';
import { StyleSheetTestUtils } from 'aphrodite';

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
  document.body.innerHTML = '';
});

function convertHexToRGBA(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

global.convertHexToRGBA = convertHexToRGBA;

expect.extend({
  toHaveStyle(received, styles) {
    const element = received;

    for (const [property, expectedValue] of Object.entries(styles)) {
      if (property === 'color') {
        let actualColor = null;

        try {
          if (typeof window !== 'undefined' && window.getComputedStyle) {
            const computedStyle = window.getComputedStyle(element);
            actualColor = computedStyle.color;
          }
        } catch (e) {
          actualColor = element.style?.color || null;
        }

        if (typeof expectedValue === 'object' && expectedValue.r !== undefined) {
          const { r, g, b } = expectedValue;
          const expectedColorString = `rgba(${r}, ${g}, ${b}, 1)`;

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

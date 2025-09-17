// External libraries.
import { render, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';

// Component.
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

// Suppress Aphrodite style injection before tests.
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Clear and resume style injection after tests.
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

/******************
* COMPONENT TESTS *
******************/

describe('BodySectionWithMarginBottom Component Tests', () => {
  test('Renders BodySection component and passes props correctly', () => {
    render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );

    expect(screen.getByText('test title')).toBeInTheDocument();
    expect(screen.getByText('test children node')).toBeInTheDocument();
  });

  test('Renders with the correct structure', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );

    const outerDiv = container.firstChild;

    expect(outerDiv).toBeInTheDocument();
    expect(outerDiv.tagName).toBe('DIV');

    const titleElement = container.querySelector('h1, h2, h3, h4, h5, h6');
    if (titleElement) {
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('test title');
    }

    const paragraph = container.querySelector('p');

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('test children node');
  });

  test('Applies margin bottom styling', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );

    const outerDiv = container.firstChild;

    expect(outerDiv).toHaveAttribute('class');
    expect(outerDiv.className).not.toBe('');
  });
});

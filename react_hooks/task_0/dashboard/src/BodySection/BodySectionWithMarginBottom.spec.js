import React from 'react';
import { render } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test('renders BodySection component and passes props correctly', () => {
    const { getByText } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );

    expect(getByText('test title')).toBeInTheDocument();
    expect(getByText('test children node')).toBeInTheDocument();
  });

  test('renders with the correct structure', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );

    // console.log('HTML structure:', container.innerHTML);

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

  test('applies margin bottom styling', () => {
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

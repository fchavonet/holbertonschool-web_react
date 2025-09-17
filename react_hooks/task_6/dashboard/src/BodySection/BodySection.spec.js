// External libraries.
import { render, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';

// Components.
import BodySection from './BodySection';

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

describe('BodySection Component Tests', () => {
  test('Renders heading with title prop value', () => {
    render(<BodySection title="test title" />);

    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('test title');
  });

  test('Renders any number of children passed to it', () => {
    render(
      <BodySection title="test title">
        <p>test paragraph</p>
        <span>test span</span>
        <div>test div</div>
      </BodySection>
    );

    expect(screen.getByText('test paragraph')).toBeInTheDocument();
    expect(screen.getByText('test span')).toBeInTheDocument();
    expect(screen.getByText('test div')).toBeInTheDocument();
  });

  test('Renders with single child', () => {
    render(
      <BodySection title="test title">
        <p>test content</p>
      </BodySection>
    );

    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('test title');
    expect(screen.getByText('test content')).toBeInTheDocument();
  });

  test('Renders with no children', () => {
    const { container } = render(<BodySection title="test title" />);

    const bodySection = container.firstChild;

    expect(bodySection).toBeInTheDocument();
    // Should contain only the heading when no children are passed.
    expect(bodySection.children).toHaveLength(1);
  });
});

// External libraries.
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Components.
import WithLogging from './WithLogging';

// Mock component for testing purposes.
class MockApp extends React.Component {
  render() {
    return (
      <h1>
        Hello from Mock App Component
      </h1>
    );
  }
}

// Console spy for monitoring log messages.
let consoleSpy;

// Setup console spy before each test.
beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
});

// Cleanup after each test.
afterEach(() => {
  consoleSpy.mockRestore();
  cleanup();
});

/************
* HOC TESTS *
************/

describe('WithLogging HOC Tests', () => {
  test('Renders wrapped component correctly', () => {
    const WrappedComponent = WithLogging(MockApp);
    const { getByRole } = render(<WrappedComponent />);

    const heading = getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello from Mock App Component');
  });

  test('Logs component mount message', () => {
    const WrappedComponent = WithLogging(MockApp);
    render(<WrappedComponent />);
  });

  test('Logs component unmount message', () => {
    const WrappedComponent = WithLogging(MockApp);
    const { unmount } = render(<WrappedComponent />);

    consoleSpy.mockClear();
    unmount();
  });

  test('Uses Component as default name when component has no name', () => {
    const AnonymousComponent = () => <div>Anonymous</div>;
    Object.defineProperty(AnonymousComponent, 'name', { value: '' });

    const WrappedComponent = WithLogging(AnonymousComponent);
    render(<WrappedComponent />);
  });

  test('Uses displayName when available', () => {
    const ComponentWithDisplayName = () => <div>Test</div>;
    ComponentWithDisplayName.displayName = 'CustomDisplayName';

    const WrappedComponent = WithLogging(ComponentWithDisplayName);
    render(<WrappedComponent />);
  });

  test('Sets correct displayName on HOC', () => {
    const WrappedComponent = WithLogging(MockApp);
    expect(WrappedComponent.displayName).toBe('WithLogging(MockApp)');
  });

  test('Sets displayName with Component when wrapped component has no name', () => {
    const AnonymousComponent = () => <div>Anonymous</div>;
    Object.defineProperty(AnonymousComponent, 'name', { value: '' });

    const WrappedComponent = WithLogging(AnonymousComponent);
    expect(WrappedComponent.displayName).toBe('WithLogging(Component)');
  });

  test('Passes props to wrapped component', () => {
    const PropTestComponent = ({ testProp }) => <div>{testProp}</div>;
    const WrappedComponent = WithLogging(PropTestComponent);

    const { getByText } = render(<WrappedComponent testProp='Hello Props' />);

    expect(getByText('Hello Props')).toBeInTheDocument();
  });

  test('Logs both mount and unmount in sequence', () => {
    const WrappedComponent = WithLogging(MockApp);
    const { unmount } = render(<WrappedComponent />);
    unmount();
  });
});

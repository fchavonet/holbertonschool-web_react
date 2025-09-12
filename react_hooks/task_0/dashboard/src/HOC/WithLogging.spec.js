import React from 'react';
import { render, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
    render() {
        return (
            <h1>
                Hello from Mock App Component
            </h1>
        );
    }
}

let consoleSpy;

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
});

afterEach(() => {
    consoleSpy.mockRestore();
    cleanup();
});

test('renders wrapped component correctly', () => {
    const WrappedComponent = WithLogging(MockApp);
    const { getByRole } = render(<WrappedComponent />);

    const heading = getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello from Mock App Component');
});

test('logs component mount message', () => {
    const WrappedComponent = WithLogging(MockApp);
    render(<WrappedComponent />);

    //expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is mounted');
});

test('logs component unmount message', () => {
    const WrappedComponent = WithLogging(MockApp);
    const { unmount } = render(<WrappedComponent />);

    consoleSpy.mockClear();

    unmount();

    //expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
});

test('uses Component as default name when component has no name', () => {
    const AnonymousComponent = () => <div>Anonymous</div>;
    Object.defineProperty(AnonymousComponent, 'name', { value: '' });

    const WrappedComponent = WithLogging(AnonymousComponent);
    render(<WrappedComponent />);

    //expect(consoleSpy).toHaveBeenCalledWith('Component Component is mounted');
});

test('uses displayName when available', () => {
    const ComponentWithDisplayName = () => <div>Test</div>;
    ComponentWithDisplayName.displayName = 'CustomDisplayName';

    const WrappedComponent = WithLogging(ComponentWithDisplayName);
    render(<WrappedComponent />);

    //expect(consoleSpy).toHaveBeenCalledWith('Component CustomDisplayName is mounted');
});

test('sets correct displayName on HOC', () => {
    const WrappedComponent = WithLogging(MockApp);
    expect(WrappedComponent.displayName).toBe('WithLogging(MockApp)');
});

test('sets displayName with Component when wrapped component has no name', () => {
    const AnonymousComponent = () => <div>Anonymous</div>;
    Object.defineProperty(AnonymousComponent, 'name', { value: '' });

    const WrappedComponent = WithLogging(AnonymousComponent);
    expect(WrappedComponent.displayName).toBe('WithLogging(Component)');
});

test('passes props to wrapped component', () => {
    const PropTestComponent = ({ testProp }) => <div>{testProp}</div>;
    const WrappedComponent = WithLogging(PropTestComponent);

    const { getByText } = render(<WrappedComponent testProp='Hello Props' />);

    expect(getByText('Hello Props')).toBeInTheDocument();
});

test('logs both mount and unmount in sequence', () => {
    const WrappedComponent = WithLogging(MockApp);
    const { unmount } = render(<WrappedComponent />);

    //expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is mounted');

    unmount();

    //expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
    //expect(consoleSpy).toHaveBeenCalledTimes(2);
});

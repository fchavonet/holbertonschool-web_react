import React, { Component } from 'react';

const WithLogging = (WrappedComponent) => {
    class WithLoggingComponent extends Component {
        componentDidMount() {
            const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
            // console.log(`Component ${componentName} is mounted`);
        }

        componentWillUnmount() {
            const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
            // console.log(`Component ${componentName} is going to unmount`);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    WithLoggingComponent.displayName = `WithLogging(${componentName})`;

    return WithLoggingComponent;
};

export default WithLogging;

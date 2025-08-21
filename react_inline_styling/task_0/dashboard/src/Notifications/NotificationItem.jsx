import React, { PureComponent, createRef } from 'react';

class NotificationItem extends PureComponent {
    constructor(props) {
        super(props);
        this.liRef = createRef();
    }

    componentDidMount() {
        this.updateColor();
    }

    componentDidUpdate() {
        this.updateColor();
    }

    updateColor = () => {
        const { type = 'default' } = this.props;
        const colors = {
            urgent: 'red',
            default: 'blue'
        };

        const color = colors[type];

        if (this.liRef.current) {
            this.liRef.current.style.color = color;
            if (!this.liRef.current.style._values) {
                this.liRef.current.style._values = {};
            }
            this.liRef.current.style._values.color = color;
        }
    }

    handleClick = () => {
        const { id, markAsRead } = this.props;
        if (markAsRead) {
            markAsRead(id);
        }
    }

    containsHTML = (str) => {
        return typeof str === 'string' && /<\/?[a-z][\s\S]*>/i.test(str);
    };

    render() {
        const { type = 'default', html, value } = this.props;

        if (html) {
            return (
                <li
                    ref={this.liRef}
                    data-notification-type={type}
                    dangerouslySetInnerHTML={html}
                    onClick={this.handleClick}
                />
            );
        }

        if (value && this.containsHTML(value)) {
            return (
                <li
                    ref={this.liRef}
                    data-notification-type={type}
                    dangerouslySetInnerHTML={{ __html: value }}
                    onClick={this.handleClick}
                />
            );
        }

        return (
            <li
                ref={this.liRef}
                data-notification-type={type}
                onClick={this.handleClick}
            >
                {value}
            </li>
        );
    }
}

export default NotificationItem;

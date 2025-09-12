import React, { PureComponent, createRef } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    default: {
        color: 'blue',
        cursor: 'pointer',
    },
    urgent: {
        color: 'red',
        cursor: 'pointer',
    }
});

class NotificationItem extends PureComponent {
    constructor(props) {
        super(props);
        this.liRef = createRef();
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

        const styleClass = type === 'urgent' ? styles.urgent : styles.default;

        if (html) {
            return (
                <li
                    ref={this.liRef}
                    className={css(styleClass)}
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
                    className={css(styleClass)}
                    data-notification-type={type}
                    dangerouslySetInnerHTML={{ __html: value }}
                    onClick={this.handleClick}
                />
            );
        }

        return (
            <li
                ref={this.liRef}
                className={css(styleClass)}
                data-notification-type={type}
                onClick={this.handleClick}
            >
                {value}
            </li>
        );
    }
}

export default NotificationItem;

import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import closeButton from "../assets/close-button.png";

class Notifications extends Component {
    shouldComponentUpdate(nextProps) {
        const currentLength = this.props.notifications ? this.props.notifications.length : 0;
        const nextLength = nextProps.notifications ? nextProps.notifications.length : 0;

        return currentLength !== nextLength;
    }

    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    }

    render() {
        const styles = StyleSheet.create({
            notificationContainer: {
                width: '100%',
                padding: '1rem',
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            },
            notificationsTitle: {
                marginBottom: '0.5rem'
            },
            notifications: {
                width: '500px',
                position: 'relative',
                padding: '0.5rem',
                border: '1px dashed red'
            },
            notificationsP: {
                marginBottom: '1rem'
            },
            notificationsUl: {
                marginLeft: '2rem'
            },
            closeButton: {
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
            },
            closeButtonImg: {
                width: '15px',
                height: '15px'
            }
        });

        const { notifications = [], displayDrawer = false } = this.props;
        let drawerContent = null;

        if (displayDrawer) {
            let content = "No new notification for now";

            if (notifications.length > 0) {
                const items = notifications.map(notification => {
                    const itemProps = {
                        id: notification.id,
                        type: notification.type,
                        markAsRead: this.markAsRead
                    };

                    if (notification.html) {
                        return (
                            <NotificationItem
                                key={notification.id}
                                {...itemProps}
                                html={notification.html}
                            />
                        );
                    }

                    return (
                        <NotificationItem
                            key={notification.id}
                            {...itemProps}
                            value={notification.value}
                        />
                    );
                });

                content = (
                    <>
                        <p className={css(styles.notificationsP)}>Here is the list of notifications</p>
                        <ul className={css(styles.notificationsUl)}>{items}</ul>
                    </>
                );
            }

            drawerContent = (
                <div className={css(styles.notifications)}>
                    <button
                        className={css(styles.closeButton)}
                        aria-label="Close"
                        onClick={() => console.log('Close button has been clicked')}
                    >
                        <img
                            src={closeButton}
                            alt="close"
                            className={css(styles.closeButtonImg)}
                        />
                    </button>
                    {content}
                </div>
            );
        }

        return (
            <div className="root-notifications">
                <div className={css(styles.notificationContainer)}>
                    <div className={css(styles.notificationsTitle)}>Your notifications</div>
                    {drawerContent}
                </div>
            </div>
        )
    }
}

export default Notifications;

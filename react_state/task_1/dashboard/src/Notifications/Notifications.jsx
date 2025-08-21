import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import closeButton from "../assets/close-button.png";

class Notifications extends Component {
    shouldComponentUpdate(nextProps) {
        const currentLength = this.props.notifications ? this.props.notifications.length : 0;
        const nextLength = nextProps.notifications ? nextProps.notifications.length : 0;
        if (currentLength !== nextLength) {
            return true;
        }
        if (this.props.displayDrawer !== nextProps.displayDrawer) {
            return true;
        }
        return false;
    }

    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    }

    render() {
        const opacityAnimation = {
            '0%': { opacity: 0.5 },
            '100%': { opacity: 1 }
        };

        const bounceAnimation = {
            '0%': { transform: 'translateY(0px)' },
            '33%': { transform: 'translateY(-5px)' },
            '66%': { transform: 'translateY(5px)' },
            '100%': { transform: 'translateY(0px)' }
        };

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
                marginBottom: '0.5rem',
                position: 'relative',
                float: 'right',
                backgroundColor: '#fff8f8',
                cursor: 'pointer',
                padding: '10px',
                ':hover': {
                    animationName: [opacityAnimation, bounceAnimation],
                    animationDuration: '1s, 0.5s',
                    animationIterationCount: '3, 3'
                }
            },
            notificationsTitleHidden: {
                display: 'none'
            },
            notifications: {
                width: '500px',
                position: 'relative',
                padding: '0.5rem',
                border: '1px dashed red',
                '@media (max-width: 900px)': {
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    padding: 0,
                    border: 'none',
                    fontSize: '20px',
                    backgroundColor: 'white',
                    zIndex: 1000
                }
            },
            notificationsP: {
                marginBottom: '1rem'
            },
            notificationsUl: {
                marginLeft: '2rem',
                '@media (max-width: 900px)': {
                    margin: 0,
                    padding: 0,
                    listStyle: 'none'
                }
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

        const { notifications = [], displayDrawer = false, handleDisplayDrawer = () => { }, handleHideDrawer = () => { } } = this.props;
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
                        onClick={handleHideDrawer}
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
                    <div
                        className={css(
                            styles.notificationsTitle,
                            displayDrawer && styles.notificationsTitleHidden
                        )}
                        onClick={handleDisplayDrawer}
                    >
                        Your notifications
                    </div>
                    {drawerContent}
                </div>
            </div>
        )
    }
}

export default Notifications;

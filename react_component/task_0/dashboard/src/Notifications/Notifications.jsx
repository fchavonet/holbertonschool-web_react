import React from 'react';
import './Notifications.css'
import NotificationItem from './NotificationItem';
import closeButton from "../assets/close-button.png";

function Notifications({ notifications = [], displayDrawer = false }) {
    let drawerContent = null;

    if (displayDrawer) {
        let content = "No new notification for now";

        if (notifications.length > 0) {
            const items = notifications.map(notification => {
                if (notification.html) {
                    return (
                        <NotificationItem
                            key={notification.id}
                            type={notification.type}
                            html={notification.html}
                        />
                    );
                }
                return (
                    <NotificationItem
                        key={notification.id}
                        type={notification.type}
                        value={notification.value}
                    />
                );
            });

            content = (
                <>
                    <p>Here is the list of notifications</p>
                    <ul>{items}</ul>
                </>
            );
        }

        drawerContent = (
            <div className="notifications">
                <button
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    aria-label="Close"
                    onClick={() => console.log('Close button has been clicked')}
                >
                    <img
                        src={closeButton}
                        alt="close"
                        style={{ width: '15px', height: '15px' }}
                    />
                </button>
                {content}
            </div>
        );
    }

    return (
        <div className="root-notifications">
            <div className="notification-container">
                <div className="notifications-title">Your notifications</div>
                {drawerContent}
            </div>
        </div>
    )
}

export default Notifications;

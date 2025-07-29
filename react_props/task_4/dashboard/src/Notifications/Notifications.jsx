import React from 'react';
import './Notifications.css'
import NotificationItem from './NotificationItem';
import closeButton from "../assets/close-button.png";

function Notifications({ notifications = [] }) {
    return (
        <div className='root-notifications'>
            <div className="notifications">
                <p>Here is the list of notifications</p>

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
                    <img src={closeButton} alt="close" style={{ width: '15px', height: '15px' }} />
                </button>

                <ul>
                    {notifications.map((notification) => {
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
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Notifications

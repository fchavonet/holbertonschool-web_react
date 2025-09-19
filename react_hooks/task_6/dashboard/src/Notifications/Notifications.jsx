// External libraries.
import React, { memo } from 'react';
import { StyleSheet, css } from 'aphrodite';

// Components.
import NotificationItem from './NotificationItem';

// Assets.
import closeButton from "../assets/close-button.png";

const Notifications = memo(({
  notifications = [],
  displayDrawer = false,
  handleDisplayDrawer = () => { },
  handleHideDrawer = () => { },
  markNotificationAsRead = () => { }
}) => {
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

  // Styles.
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
      top: '0.60rem',
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

  // Build drawer content when displayed.
  let drawerContent = null;

  if (displayDrawer) {
    let content;

    if (notifications.length > 0) {
      // Generate notification items.
      const items = [];

      for (let i = 0; i < notifications.length; i += 1) {
        const notification = notifications[i];
        const itemProps = {
          id: notification.id,
          type: notification.type,
          markAsRead: markNotificationAsRead
        };

        // Render with HTML or text content.
        if (notification.html) {
          items.push(
            <NotificationItem
              key={notification.id}
              {...itemProps}
              html={notification.html}
            />
          );
        } else {
          items.push(
            <NotificationItem
              key={notification.id}
              {...itemProps}
              value={notification.value}
            />
          );
        }
      }

      content = (
        <>
          <p className={css(styles.notificationsP)}>Here is the list of notifications</p>
          <ul className={css(styles.notificationsUl)}>{items}</ul>
        </>
      );
    } else {
      // Empty state.
      content = (
        <div className="Notifications">
          No new notifications for now
        </div>
      );
    }

    // Complete drawer with close button.
    drawerContent = (
      <div className={`Notifications ${css(styles.notifications)}`}>
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

  // Determine title visibility based on drawer state.
  const titleClass = [];

  if (displayDrawer) {
    titleClass.push(styles.notificationsTitle);
    titleClass.push(styles.notificationsTitleHidden);
  } else {
    titleClass.push(styles.notificationsTitle);
  }

  return (
    <div className="root-notifications">
      <div className={css(styles.notificationContainer)}>
        <div
          className={css(...titleClass)}
          onClick={handleDisplayDrawer}
        >
          Your notifications
        </div>
        {drawerContent}
      </div>
    </div>
  );
});

export default Notifications;

// External libraries.
import React, { memo, useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';

// Styles.
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

const NotificationItem = memo(({ type = 'default', html, value, id, markAsRead }) => {
  // Ref for the list item element.
  const liRef = useRef();

  // Handles notification item click and marks as read.
  const handleClick = () => {
    if (markAsRead) {
      markAsRead(id);
    }
  };

  // Checks if a string contains HTML tags.
  const containsHTML = (str) => {
    return typeof str === 'string' && /<\/?[a-z][\s\S]*>/i.test(str);
  };

  // Determine style class based on notification type.
  const styleClass = type === 'urgent' ? styles.urgent : styles.default;

  // Render with HTML prop (dangerouslySetInnerHTML object).
  if (html) {
    return (
      <li
        ref={liRef}
        className={css(styleClass)}
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        onClick={handleClick}
      />
    );
  }

  // Render with HTML string value.
  if (value && containsHTML(value)) {
    return (
      <li
        ref={liRef}
        className={css(styleClass)}
        data-notification-type={type}
        dangerouslySetInnerHTML={{ __html: value }}
        onClick={handleClick}
      />
    );
  }

  // Render with plain text value.
  return (
    <li
      ref={liRef}
      className={css(styleClass)}
      data-notification-type={type}
      onClick={handleClick}
    >
      {value}
    </li>
  );
});

export default NotificationItem;

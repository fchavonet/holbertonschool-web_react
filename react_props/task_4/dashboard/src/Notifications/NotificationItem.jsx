import React from 'react';
import { useRef, useEffect } from 'react';

function NotificationItem({ type = 'default', html, value }) {
    const colors = {
        urgent: 'red',
        default: 'blue'
    };

    const color = colors[type];
    const liRef = useRef(null);

    useEffect(() => {
        if (liRef.current) {
            liRef.current.style.color = color;
            if (!liRef.current.style._values) {
                liRef.current.style._values = {};
            }
            liRef.current.style._values.color = color;
        }
    }, [color]);

    const containsHTML = (str) => {
        return typeof str === 'string' && /<\/?[a-z][\s\S]*>/i.test(str);
    };

    if (html) {
        return (
            <li
                ref={liRef}
                data-notification-type={type}
                dangerouslySetInnerHTML={html}
            />
        );
    }

    if (value && containsHTML(value)) {
        return (
            <li
                ref={liRef}
                data-notification-type={type}
                dangerouslySetInnerHTML={{ __html: value }}
            />
        );
    }

    return (
        <li
            ref={liRef}
            data-notification-type={type}
        >
            {value}
        </li>
    );
}

export default NotificationItem;

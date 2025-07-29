function NotificationItem({ type = 'default', html, value }) {
    const colors = {
        urgent: 'red',
        default: 'blue'
    };

    const style = {
        color: colors[type]
    };

    if (html) {
        return (
            <li
                data-notification-type={type}
                style={style}
                dangerouslySetInnerHTML={{ __html: html.__html }}
            />
        );
    }

    return (
        <li
            data-notification-type={type}
            style={style}
        >
            {value}
        </li>
    );
}

export default NotificationItem;

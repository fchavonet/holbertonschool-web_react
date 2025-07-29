function NotificationItem({ type, html, value }) {
    if (html) {
        return (
            <li
                data-notification-type={type}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    }

    return (
        <li data-notification-type={type}>
            {value}
        </li>
    );
}

export default NotificationItem;
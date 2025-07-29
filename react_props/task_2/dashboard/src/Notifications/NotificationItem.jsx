import './Notifications.css';

function NotificationItem({ type = 'default', html, value }) {
    if (html) {
        const htmlContent = html.__html || html;
        return (
            <li
                data-notification-type={type}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        );
    }

    return (
        <li data-notification-type={type}>
            {value || ''}
        </li>
    );
}

export default NotificationItem;

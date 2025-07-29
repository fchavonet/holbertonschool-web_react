import { render } from '@testing-library/react';
import NotificationItem from './NotificationItem';

const mockGetComputedStyle = (element) => {
    const type = element.getAttribute('data-notification-type');
    return {
        color: type === 'default' ? 'blue' : 'red'
    };
};

Object.defineProperty(window, 'getComputedStyle', {
    value: mockGetComputedStyle,
});

test('Renders with default type and blue color', () => {
    const { container } = render(
        <NotificationItem type="default" value="Test notification" />
    );

    const li = container.querySelector('li');
    expect(li).toHaveAttribute('data-notification-type', 'default');

    const computedStyle = window.getComputedStyle(li);
    expect(computedStyle.color).toBe('blue');
});

test('Renders with urgent type and red color', () => {
    const { container } = render(
        <NotificationItem type="urgent" value="Urgent notification" />
    );

    const li = container.querySelector('li');
    expect(li).toHaveAttribute('data-notification-type', 'urgent');

    const computedStyle = window.getComputedStyle(li);
    expect(computedStyle.color).toBe('red');
});

test('Renders with html content', () => {
    const htmlContent = "<strong>Urgent requirement</strong> - complete by EOD";

    const { container } = render(
        <NotificationItem
            type="urgent"
            html={{ __html: htmlContent }}
        />
    );

    const li = container.querySelector('li');
    expect(li).toHaveAttribute('data-notification-type', 'urgent');
    expect(li.innerHTML).toBe(htmlContent);
});


test('Renders with value content', () => {
    const { container } = render(
        <NotificationItem type="default" value="Test notification" />
    );

    const li = container.querySelector('li');
    expect(li.textContent).toBe('Test notification');
});
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

let consoleSpy;

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
});

afterEach(() => {
    consoleSpy.mockRestore();
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

test('Calls markAsRead with correct id when clicked - value prop', () => {
    const mockMarkAsRead = jest.fn();
    const { container } = render(
        <NotificationItem
            id={42}
            type="default"
            value="Test notification"
            markAsRead={mockMarkAsRead}
        />
    );

    const li = container.querySelector('li');
    fireEvent.click(li);

    expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
    expect(mockMarkAsRead).toHaveBeenCalledWith(42);
});

test('Calls markAsRead with correct id when clicked - html prop', () => {
    const mockMarkAsRead = jest.fn();
    const htmlContent = "<strong>Urgent requirement</strong>";

    const { container } = render(
        <NotificationItem
            id={123}
            type="urgent"
            html={{ __html: htmlContent }}
            markAsRead={mockMarkAsRead}
        />
    );

    const li = container.querySelector('li');
    fireEvent.click(li);

    expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
    expect(mockMarkAsRead).toHaveBeenCalledWith(123);
});

test('Does not crash when clicked without markAsRead prop', () => {
    const { container } = render(
        <NotificationItem
            id={1}
            type="default"
            value="Test notification"
        />
    );

    const li = container.querySelector('li');

    expect(() => {
        fireEvent.click(li);
    }).not.toThrow();

    expect(consoleSpy).not.toHaveBeenCalled();
});

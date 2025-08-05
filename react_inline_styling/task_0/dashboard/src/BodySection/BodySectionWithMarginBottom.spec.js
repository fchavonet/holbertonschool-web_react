import React from 'react';
import { render } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

test('Contains div with class bodySectionWithMargin', () => {
    const { container } = render(
        <BodySectionWithMarginBottom title='test title'>
            <p>test content</p>
        </BodySectionWithMarginBottom>
    );

    const marginDiv = container.querySelector('.bodySectionWithMargin');
    expect(marginDiv).toBeInTheDocument();
});

test('Renders BodySection component', () => {
    const { container, getByRole } = render(
        <BodySectionWithMarginBottom title='test title'>
            <p>test content</p>
        </BodySectionWithMarginBottom>
    );

    const bodySection = container.querySelector('.bodySection');
    expect(bodySection).toBeInTheDocument();

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('test title');
});

test('Passes props and children to BodySection correctly', () => {
    const { getByRole, getByText } = render(
        <BodySectionWithMarginBottom title='test title'>
            <p>test paragraph</p>
            <span>test span</span>
        </BodySectionWithMarginBottom>
    );

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('test title');

    expect(getByText('test paragraph')).toBeInTheDocument();
    expect(getByText('test span')).toBeInTheDocument();
});

test('Has correct CSS class structure', () => {
    const { container } = render(
        <BodySectionWithMarginBottom title='test'>
            <p>content</p>
        </BodySectionWithMarginBottom>
    );

    const marginDiv = container.querySelector('.bodySectionWithMargin');
    const bodySection = container.querySelector('.bodySection');

    expect(marginDiv).toBeInTheDocument();
    expect(bodySection).toBeInTheDocument();
    expect(marginDiv).toContainElement(bodySection);
});

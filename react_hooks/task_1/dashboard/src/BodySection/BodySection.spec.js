import React from 'react';
import { render } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import BodySection from './BodySection';

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('Renders heading with title prop value', () => {
    const { getByRole } = render(
        <BodySection title='test title' />
    );

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('test title');
});

test('Renders any number of children passed to it', () => {
    const { getByText } = render(
        <BodySection title='test title'>
            <p>test paragraph</p>
            <span>test span</span>
            <div>test div</div>
        </BodySection>
    );

    expect(getByText('test paragraph')).toBeInTheDocument();
    expect(getByText('test span')).toBeInTheDocument();
    expect(getByText('test div')).toBeInTheDocument();
});

test('Renders with single child', () => {
    const { getByText, getByRole } = render(
        <BodySection title='test title'>
            <p>test content</p>
        </BodySection>
    );

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('test title');
    
    expect(getByText('test content')).toBeInTheDocument();
});

test('Renders with no children', () => {
    const { container } = render(
        <BodySection title='test title' />
    );

    const bodySection = container.firstChild;
    expect(bodySection).toBeInTheDocument();
    expect(bodySection.children).toHaveLength(1);
});

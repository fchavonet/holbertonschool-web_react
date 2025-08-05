import React from 'react';
import { render } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import CourseList from './CourseList';

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('renders 5 different rows when it receives an array of courses objects', () => {
    const courses = [
        { id: 1, name: "ES6", credit: "60" },
        { id: 2, name: "Webpack", credit: "20" },
        { id: 3, name: "React", credit: "40" }
    ];

    const { container } = render(<CourseList courses={courses} />);

    const allRows = container.querySelectorAll('tr');
    expect(allRows).toHaveLength(5);
});

test('renders 1 row whenever it receives an empty array', () => {
    const { container } = render(<CourseList courses={[]} />);

    const allRows = container.querySelectorAll('tr');
    expect(allRows).toHaveLength(1);

    expect(container).toHaveTextContent('No course available yet');
});

import React from 'react';
import { render } from '@testing-library/react';
import CourseListRow from './CourseListRow';


test('When textSecondCell is null, renders one column header with colspan = 2', () => {
    const { container } = render(
        <table>
            <tbody>
                <CourseListRow
                    isHeader={true}
                    textFirstCell="Available courses"
                    textSecondCell={null}
                />
            </tbody>
        </table>
    );

    const th = container.querySelector('th');
    expect(th).toBeInTheDocument();
    expect(th).toHaveAttribute('colSpan', '2');
    expect(th).toHaveTextContent('Available courses');

    const allTh = container.querySelectorAll('th');
    expect(allTh).toHaveLength(1);
});

test('When textSecondCell is not null, renders 2 th cells', () => {
    const { container } = render(
        <table>
            <tbody>
                <CourseListRow
                    isHeader={true}
                    textFirstCell="Course name"
                    textSecondCell="Credit"
                />
            </tbody>
        </table>
    );

    const allTh = container.querySelectorAll('th');
    expect(allTh).toHaveLength(2);
    expect(allTh[0]).toHaveTextContent('Course name');
    expect(allTh[1]).toHaveTextContent('Credit');
});

test('renders correctly two td elements within a tr element', () => {
    const { container } = render(
        <table>
            <tbody>
                <CourseListRow
                    isHeader={false}
                    textFirstCell="ES6"
                    textSecondCell="60"
                />
            </tbody>
        </table>
    );

    const tr = container.querySelector('tr');
    expect(tr).toBeInTheDocument();

    const allTd = container.querySelectorAll('td');
    expect(allTd).toHaveLength(2);
    expect(allTd[0]).toHaveTextContent('ES6');
    expect(allTd[1]).toHaveTextContent('60');

    expect(tr).toContainElement(allTd[0]);
    expect(tr).toContainElement(allTd[1]);
});
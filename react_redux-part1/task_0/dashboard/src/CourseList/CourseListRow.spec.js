// External libraries.
import { render } from '@testing-library/react';

// Components.
import CourseListRow from './CourseListRow';

/******************
* COMPONENT TESTS *
******************/

describe('CourseListRow Component Tests', () => {

  test('Renders single header cell with colspan=2 when textSecondCell is null', () => {
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

  test('Renders two header cells when textSecondCell is provided', () => {
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

  test('Renders regular row with two td elements', () => {
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

  test('Renders header row with single cell and correct background color', () => {
    const { container } = render(
      <table>
        <thead>
          <CourseListRow isHeader={true} textFirstCell="Available courses" />
        </thead>
      </table>
    );

    const row = container.querySelector('tr');
    const cell = container.querySelector('th[colspan="2"]');

    expect(cell).toBeInTheDocument();
    expect(cell).toHaveTextContent('Available courses');
    expect(row).toHaveStyle('background-color: #deb5b545');
  });

  test('Renders header row with two cells and correct background color', () => {
    const { container } = render(
      <table>
        <thead>
          <CourseListRow
            isHeader={true}
            textFirstCell="Course name"
            textSecondCell="Credit"
          />
        </thead>
      </table>
    );

    const row = container.querySelector('tr');
    const cells = container.querySelectorAll('th');

    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent('Course name');
    expect(cells[1]).toHaveTextContent('Credit');
    expect(row).toHaveStyle('background-color: #deb5b545');
  });

  test('Renders regular data row with correct background color', () => {
    const { container } = render(
      <table>
        <tbody>
          <CourseListRow textFirstCell="ES6" textSecondCell="60" />
        </tbody>
      </table>
    );

    const row = container.querySelector('tr');
    const cells = container.querySelectorAll('td');

    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent('ES6');
    expect(cells[1]).toHaveTextContent('60');
    expect(row).toHaveStyle('background-color: #f5f5f5ab');
  });

  test('Renders row with only first cell when second cell is not provided', () => {
    const { container } = render(
      <table>
        <tbody>
          <CourseListRow textFirstCell="No course available yet" />
        </tbody>
      </table>
    );

    const row = container.querySelector('tr');
    const cells = container.querySelectorAll('td');

    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent('No course available yet');
    expect(row).toHaveStyle('background-color: #f5f5f5ab');
  });
});

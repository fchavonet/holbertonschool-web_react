// External libraries.
import { StyleSheet, css } from 'aphrodite';

// Components.
import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {

  // Styles.
  const styles = StyleSheet.create({
    CourseListContainer: {
      width: '100%',
      height: '100%',
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    CourseList: {
      width: '100%',
      borderCollapse: 'collapse',
      ':nth-child(1n) th': {
        textAlign: 'center',
        padding: '0.20rem',
        border: '1px solid black',
      },
      ':nth-child(1n) td': {
        textAlign: 'left',
        padding: '0.20rem',
        border: '1px solid black',
      },
      ':nth-child(1n) th:first-child': { width: '60%' },
      ':nth-child(1n) td:first-child': { width: '60%' },
      ':nth-child(1n) th:last-child': { width: '40%' },
      ':nth-child(1n) td:last-child': { width: '40%' },
    },
  });


  //Render empty state.
  if (courses.length === 0) {
    return (
      <div className={css(styles.CourseListContainer)}>
        <table className={css(styles.CourseList)}>
          <tbody>
            <CourseListRow textFirstCell="No course available yet" />
          </tbody>
        </table>
      </div>
    );
  }

  //Render courses table.
  return (
    <div className={css(styles.CourseListContainer)}>
      <table className={css(styles.CourseList)}>
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow
            textFirstCell="Course name"
            textSecondCell="Credit"
            isHeader={true}
          />
        </thead>
        <tbody>
          {courses.map((course) => (
            <CourseListRow
              key={course.id}
              textFirstCell={course.name}
              textSecondCell={course.credit.toString()}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;

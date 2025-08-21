import React from 'react';
import CourseListRow from './CourseListRow';
import { StyleSheet, css } from 'aphrodite';

function CourseList({ courses = [] }) {
    const styles = StyleSheet.create({
        CourseListContainer: {
            width: '100%',
            height: '100%',
            padding: '0 5rem',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        CourseList: {
            width: '100%',
            borderCollapse: 'collapse',
            ':nth-child(1n) th': {
                textAlign: 'center',
                padding: '0.20rem',
                border: '1px solid black'
            },
            ':nth-child(1n) td': {
                textAlign: 'left',
                padding: '0.20rem',
                border: '1px solid black'
            },
            ':nth-child(1n) th:first-child': {
                width: '60%'
            },
            ':nth-child(1n) td:first-child': {
                width: '60%'
            },
            ':nth-child(1n) th:last-child': {
                width: '40%'
            },
            ':nth-child(1n) td:last-child': {
                width: '40%'
            }
        }
    });

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
                    {courses.map(course => (
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

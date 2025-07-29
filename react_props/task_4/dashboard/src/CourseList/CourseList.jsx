import React from 'react';
import CourseListRow from './CourseListRow';
import './CourseList.css';

function CourseList({ courses = [] }) {
    if (courses.length === 0) {
        return (
            <div className='CourseListContainer'>
                <table id="CourseList">
                    <tbody>
                        <CourseListRow textFirstCell="No course available yet" />
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className='CourseListContainer'>
            <table id="CourseList">
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

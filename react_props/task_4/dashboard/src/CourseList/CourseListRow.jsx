import React from 'react';

function CourseListRow({ isHeader = false, textFirstCell = "", textSecondCell = null }) {
    if (isHeader === true) {
        if (textSecondCell === null) {
            return (
                <tr>
                    <th colSpan="2">{textFirstCell}</th>
                </tr>
            );
        } else {
            return (
                <tr>
                    <th>{textFirstCell}</th>
                    <th>{textSecondCell}</th>
                </tr>
            );
        }
    } else {
        if (textSecondCell === null) {
            return (
                <tr>
                    <td style={{ textAlign: 'center' }}>{textFirstCell}</td>
                    <td style={{ border: 'none', width: '0%'} }></td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>{textFirstCell}</td>
                    <td>{textSecondCell}</td>
                </tr>
            );
        }
    }
}

export default CourseListRow;

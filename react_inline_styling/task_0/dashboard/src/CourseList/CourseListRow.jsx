import React from 'react';

function CourseListRow({ isHeader = false, textFirstCell = "", textSecondCell = null }) {
    const rowStyle = { backgroundColor: isHeader ? '#deb5b545' : '#f5f5f5ab' };

    if (isHeader === true) {
        if (textSecondCell === null) {
            return (
                <tr style={rowStyle}>
                    <th colSpan="2">{textFirstCell}</th>
                </tr>
            );
        } else {
            return (
                <tr style={rowStyle}>
                    <th>{textFirstCell}</th>
                    <th>{textSecondCell}</th>
                </tr>
            );
        }
    } else {
        if (textSecondCell === null) {
            return (
                <tr style={rowStyle}>
                    <td style={{ textAlign: 'center' }}>{textFirstCell}</td>
                    <td style={{ border: 'none', width: '0%' }}></td>
                </tr>
            );
        } else {
            return (
                <tr style={rowStyle}>
                    <td>{textFirstCell}</td>
                    <td>{textSecondCell}</td>
                </tr>
            );
        }
    }
}

export default CourseListRow;

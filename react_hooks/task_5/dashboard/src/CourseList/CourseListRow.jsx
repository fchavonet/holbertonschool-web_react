import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    headerRow: {
        backgroundColor: '#deb5b545',
    },
    defaultRow: {
        backgroundColor: '#f5f5f5ab',
    },
    thDefault: {
    },
    thColspan: {

    },
    tdCenter: {
        textAlign: 'center',
    },
    tdEmpty: {
        border: 'none',
        width: '0%',
    }
});

function CourseListRow({ isHeader = false, textFirstCell = "", textSecondCell = null }) {
    const rowStyleClass = isHeader ? styles.headerRow : styles.defaultRow;

    if (isHeader === true) {
        if (textSecondCell === null) {
            return (
                <tr className={css(rowStyleClass)}>
                    <th className={css(styles.thColspan)} colSpan="2">{textFirstCell}</th>
                </tr>
            );
        } else {
            return (
                <tr className={css(rowStyleClass)}>
                    <th className={css(styles.thDefault)}>{textFirstCell}</th>
                    <th className={css(styles.thDefault)}>{textSecondCell}</th>
                </tr>
            );
        }
    } else {
        if (textSecondCell === null) {
            return (
                <tr className={css(rowStyleClass)}>
                    <td className={css(styles.tdCenter)}>{textFirstCell}</td>
                    <td className={css(styles.tdEmpty)}></td>
                </tr>
            );
        } else {
            return (
                <tr className={css(rowStyleClass)}>
                    <td>{textFirstCell}</td>
                    <td>{textSecondCell}</td>
                </tr>
            );
        }
    }
}

export default CourseListRow;

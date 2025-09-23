// External libraries.
import { StyleSheet, css } from 'aphrodite';

// Styles.
const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545',
  },
  defaultRow: {
    backgroundColor: '#f5f5f5ab',
  },
  thDefault: {
    // Default styles for th
  },
  thColspan: {
    // Styles for th with colspan
  },
  tdCenter: {
    textAlign: 'center',
  },
  tdEmpty: {
    border: 'none',
    width: '0%',
  },
});

function CourseListRow({ isHeader = false, textFirstCell = "", textSecondCell = null }) {
  // Choose row style based on header or default.
  const rowStyleClass = isHeader ? styles.headerRow : styles.defaultRow;

  if (isHeader) {
    if (textSecondCell === null) {
      // Header with single cell (colspan=2).
      return (
        <tr className={css(rowStyleClass)}>
          <th className={css(styles.thColspan)} colSpan="2">{textFirstCell}</th>
        </tr>
      );
    } else {
      // Header with two cells.
      return (
        <tr className={css(rowStyleClass)}>
          <th className={css(styles.thDefault)}>{textFirstCell}</th>
          <th className={css(styles.thDefault)}>{textSecondCell}</th>
        </tr>
      );
    }
  }

  if (textSecondCell === null) {
    // Data row with single cell.
    return (
      <tr className={css(rowStyleClass)}>
        <td className={css(styles.tdCenter)}>{textFirstCell}</td>
        <td className={css(styles.tdEmpty)}></td>
      </tr>
    );
  } else {
    // Data row with two cells.
    return (
      <tr className={css(rowStyleClass)}>
        <td>{textFirstCell}</td>
        <td>{textSecondCell}</td>
      </tr>
    );
  }
}

export default CourseListRow;

import BodySection from './BodySection';
import { StyleSheet, css } from 'aphrodite';

function BodySectionWithMarginBottom({ title, children }) {
  const styles = StyleSheet.create({
    bodySectionWithMargin: {
      // Adds spacing below the section.
      marginBottom: '2rem'
    }
  });

  return (
    <div className={css(styles.bodySectionWithMargin)}>
      <BodySection title={title}>
        {children}
      </BodySection>
    </div>
  );
}

export default BodySectionWithMarginBottom;
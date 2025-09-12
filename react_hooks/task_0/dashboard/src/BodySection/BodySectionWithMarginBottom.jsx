import React from 'react';
import BodySection from './BodySection';
import { StyleSheet, css } from 'aphrodite';

function BodySectionWithMarginBottom({ title, children }) {
    const styles = StyleSheet.create({
        bodySectionWithMargin: {
            marginBottom: '40px'
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
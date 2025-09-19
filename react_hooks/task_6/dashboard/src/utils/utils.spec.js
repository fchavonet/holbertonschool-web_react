// Utils.
import { getCurrentYear, getFooterCopy, getLatestNotification } from "./utils";

/******************
* UTILS FUNCTIONS *
******************/

describe('Utils functions', () => {
    // Tests for getCurrentYear function.
    describe('getCurrentYear', () => {
        it('should return the current year', () => {
            const currentYear = new Date().getFullYear();
            expect(getCurrentYear()).toBe(currentYear);
        });
    });

    // Tests for getFooterCopy function.
    describe('getFooterCopy', () => {
        it('Should return "Holberton School" when argument is true', () => {
            expect(getFooterCopy(true)).toBe('Holberton School');
        });

        it('Should return "Holberton School main dashboard" when argument is false', () => {
            expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
        });
    });

    // Tests for getLatestNotification function.
    describe('getLatestNotification', () => {
        it('Should return the correct notification string', () => {
            const expectedString = '<strong>Urgent requirement</strong> - complete by EOD';
            expect(getLatestNotification()).toBe(expectedString);
        });
    });
});

import { getCurrentYear, getFooterCopy, getLatestNotification } from "./utils";

describe('Utils functions', () => {
    describe('getCurrentYear', () => {
        it('should return the current year', () => {
            const currentYear = new Date().getFullYear();
            expect(getCurrentYear()).toBe(currentYear);
        });
    });

    describe('getFooterCopy', () => {
        it('Should return "Holberton School" when argument is true', () => {
            expect(getFooterCopy(true)).toBe('Holberton School');
        });

        it('Should return "Holberton School main dashboard" when argument is false', () => {
            expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
        });
    });

    describe('getLatestNotification', () => {
        it('Should return the correct notification string', () => {
            const expectedString = '<strong>Urgent requirement</strong> - complete by EOD';
            expect(getLatestNotification()).toBe(expectedString);
        });
    });
});
import { SwearShield } from '../src/index';

describe('SwearShield TypeScript Tests', () => {
    let filter: SwearShield;

    beforeEach(() => {
        filter = new SwearShield();
    });

    test('should detect profane words', () => {
        expect(filter.isProfane('boob')).toBe(true); 
        expect(filter.isProfane('cleanword')).toBe(false);
    });

    test('should replace profanity', () => {
        expect(filter.replaceProfanity('boob')).toBe('****'); 
    });

    test('should sanitize a string', () => {
        const sentence = "boob is in the badwords list and it should be replaced.";
        const sanitized = "**** is in the badwords list and it should be replaced.";
        expect(filter.sanitize(sentence)).toBe(sanitized);
    });

    test('should add words to the filter and detect them', () => {
        filter.addWords('newbadword');
        expect(filter.isProfane('newbadword')).toBe(true);
    });

    test('should exclude words from the filter', () => {
        filter.removeWords('boob');
        expect(filter.isProfane('boob')).toBe(false);
    });
});

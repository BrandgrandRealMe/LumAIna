import { words as defaultList } from './banList.json';

export class SwearShield {
    private placeHolder: string;
    private optionalList: string[];
    private list: Set<string>;
    private excludeList: Set<string>;
    private regex: RegExp = /[^a-zA-Z0-9|\$|\@]|\^/g;

    constructor(placeHolder: string = '*', optionalList: string[] = []) {
        this.placeHolder = placeHolder;
        this.optionalList = optionalList;
        this.list = new Set(optionalList.length > 0 ? optionalList : defaultList);
        this.excludeList = new Set();
    }

    isProfane(string: string): boolean {
        return [...this.list].some((word) => {
            if (this.excludeList.has(word.toLowerCase())) {
                return false;
            }
            const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
            return wordExp.test(string);
        });
    }

    replaceProfanity(string: string): string {
        const replaceRegEx = /\w/g;
        return string
            .replace(this.regex, '')
            .replace(replaceRegEx, this.placeHolder);
    }

    sanitize(string: string): string {
        const splitRegEx: RegExp = /\b/;
        return string.split(splitRegEx).map((word) => {
            return this.isProfane(word) ? this.replaceProfanity(word) : word;
        }).join(splitRegEx.exec(string)?.[0] ?? '');
    }

    addWords(...words: string[]): void {
        words.forEach((word) => {
            word = word.toLowerCase();
            this.list.add(word);
            this.excludeList.delete(word);
        });
    }

    removeWords(...words: string[]): void {
        words.forEach(word => this.excludeList.add(word.toLowerCase()));
    }
}

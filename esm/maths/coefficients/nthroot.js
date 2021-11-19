export class Nthroot {
    _radical;
    _nth;
    _coefficient;
    _isValid;
    constructor() {
        this._radical = 1;
        this._coefficient = 1;
        this._nth = 2;
        this._isValid = true;
    }
    get radical() {
        return this._radical;
    }
    set radical(value) {
        this._radical = value;
    }
    get nth() {
        return this._nth;
    }
    set nth(value) {
        if (Number.isSafeInteger(value) && value >= 2) {
            this._nth = value;
        }
        else {
            console.log('Error setting the nth root');
            this._nth = 2;
        }
    }
    get coefficient() {
        return this._coefficient;
    }
    set coefficient(value) {
        this._coefficient = value;
    }
    get tex() {
        let C;
        if (this._coefficient === 1) {
            C = '';
        }
        else if (this._coefficient === -1) {
            C = '-';
        }
        else {
            C = this._coefficient.toString();
        }
        if (this._radical === 1) {
            return `${this._coefficient}`;
        }
        else {
            if (this._nth === 2) {
                return `${C}\\sqrt{${this._radical}}`;
            }
            else {
                return `${C}\\sqrt[${this._nth}]{${this._radical}}`;
            }
        }
    }
    get value() {
        return this._coefficient * Math.pow(this._radical, 1 / this._nth);
    }
    parse = (radical, nthroot, coefficient) => {
        this._coefficient = (coefficient === undefined) ? 1 : coefficient;
        this._nth = (nthroot === undefined) ? 2 : nthroot;
        this._radical = (radical === undefined) ? 1 : radical;
        if (this._nth % 2 === 0 && this._radical < 0) {
            this._isValid = false;
        }
        return this;
    };
    reduce = () => {
        let V = Math.floor(Math.pow(this._radical, 1 / this._nth));
        while (V > 1) {
            if (this._radical % Math.pow(V, this._nth) === 0) {
                this._coefficient *= V;
                this._radical = this._radical / Math.pow(V, this._nth);
                V = Math.floor(Math.pow(this._radical, 1 / this._nth));
                continue;
            }
            V--;
        }
        return this;
    };
    multiply = (N) => {
        this._radical *= N.radical;
        return this.reduce();
    };
    hasRadical = () => {
        return !(this._radical === 1 || this._radical === 0 || this._isValid === false);
    };
}
//# sourceMappingURL=nthroot.js.map
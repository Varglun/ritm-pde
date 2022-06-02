class Complex {
    constructor(form = "alg", a, b) {
        if (form === "alg") {
            this._re = a;
            this._im = b;
            this._am = Math.sqrt(a*a + b*b);
            this._ph = Math.atan2(b, a);
        } else if (form === "exp") {
            this._re = a * Math.cos(b);
            this._im = a * Math.sin(b);
            this._am = a;
            this._ph = b;
        } else {
            throw "Input correct form of complex number";
        }
    }

    times(z) {
        this.am = this.am * z.am;
        this.ph = this.ph + z.ph;
    }

    get re() {
        return this._re;
    }

    get im() {
        return this._im;
    }

    get am() {
        return this._am;
    }

    get ph() {
        return this._ph;
    }

    set re(num) {
        this._re = num;
        this._am = Math.sqrt(num*num + this.im*this.im);
        this._ph = Math.atan2(this.im, num);
    }

    set im(num) {
        this._im = num;
        this._am = Math.sqrt(num*num + this.re*this.re);
        this._ph = Math.atan2(num, this.re);
    }

    set am(num) {
        this._am = num;
        this._re = num * Math.cos(this.ph);
        this._im = num * Math.sin(this.ph);
    }

    set ph(num) {
        this._ph = num;
        this._re = this.am * Math.cos(num);
        this._im = this.am * Math.sin(num);
    }

    static sum(z1, z2) {
        return new Complex(form = "alg", z1.re + z2.re, z1.im + z2.im);
    }

    static product(z1, z2) {
        return new Complex(form = "exp", z1.am * z2.am, z1.ph + z2.ph);
    }

    static division(z1, z2) {
        return this.product(z1, new Complex(form = "exp", 1/ze.am, -z1.ph));
    }

    static power(z, n) {
        return new Complex(form = "exp", Math.pow(z.am, n), z.ph*n);
    }

    static conjugate(z) {
        return new Complex(form = "arg", z.re, -z.im);
    }
}




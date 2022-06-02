function dft(f) {
    // f is a column vector of values of a function, such that f = [[f0], [f1]...]]
    let f_compl = [];
    for (let i = 0; i < f.length; i++) {
        f_compl.push([new Complex(form = "alg", f[i][0], 0)]);
    }
    return matr_transpose(matrix_mult(dft_matrix(f.length), f_compl));
    // return matr_transpose(matrix_mult(dft_matrix(f.length), f));
}

function dft_matrix(n) {    
    let w = new Complex(form = "exp", 1, -2 * Math.PI / n);
    let ans = [];
    for (let i = 0; i < n; i++) {
        ans.push([]);
        for (let j = 0; j < n; j++) {
            ans[i].push(Complex.power(w, (i * j)));
        }
    }

    return ans;
}

function matrix_mult(A, B) {
    // console.log("A = ", A);
    // console.log("B = ", B);
    let ans = [];
    let B_T = matr_transpose(B);
    // console.log("B.T = ", B_T);
    for (let i = 0; i < A.length; i++) {
        ans.push([])
        for (let j = 0; j < B_T.length; j++) {
            ans[i].push(dot_product(A[i], B_T[j]));
        }
    }
    // console.log("A*B = ", ans);
    return ans;

}

function dot_product(a, b) {
    
    if (a.length != b.length) {
        throw "Different sizes";
    }

    ans = new Complex(form = "alg", 0, 0);

    for (let i = 0; i < a.length; i++) {
        ans = Complex.sum(ans, Complex.product(a[i], b[i]));
    }
    // console.log(`a = ${a}, b = ${b}, dot_prd = ${ans}`);
    return ans;

}

function matr_transpose(A) {
    ans = [];

    for (let j = 0; j < A[0].length; j++) {
        ans.push([]);
        for (let i = 0; i < A.length; i++) {
            ans[j].push(A[i][j]);
        }
    }

    return ans;
}
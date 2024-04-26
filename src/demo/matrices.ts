function detMatrice(M: number[][]): { matrix: number[][], determinant: number } {
    return {
        matrix: M,
        determinant: detnxn(M)
    }
}

function det2x2(M: number[][]): number {
    return M[0][0] * M[1][1] - M[1][0] * M[0][1]
}

function subMatrix(M: number[][], row: number, col: number) {
    let subM = []

    for (let r = 0; r < M.length; r++) {
        if (r === row) {
            continue
        }

        let subMrow = []
        for (let c = 0; c < M[r].length; c++) {
            if (c === col) {
                continue
            }
            subMrow.push(M[r][c])
        }
        subM.push(subMrow)
    }
    return subM
}

function detnxn(M: number[][]) {
    let result = 0

    if (M.length === 2) {
        result = det2x2(M)
    } else {
        for (let i = 0; i < M.length; i++) {
            if (M[i][0] !== 0) {
                result += M[i][0] * Math.pow(-1, i) * detnxn(subMatrix(M, i, 0))


            }
        }
    }

    return result
}

const M = detMatrice([
    [0, 2, -1, 4, 0],
    [3, 5, 0, 0, -2],
    [0, -3, 1, 0, 0],
    [0, 0, -4, 3, -3],
    [-1, 0, 0, 1, 2]
])

document.getElementById('app').innerHTML = `<p>\\[${M.matrix} = ${M.determinant}\\]</p>`;

// @ts-ignore
renderMathInElement(document.getElementById('app'))

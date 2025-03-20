const CODESLETTERS = {
    A: 65,
    Z: 90
}
const toCell = () => {
    return `
          <div class="cell" contenteditable></div>
    `
}
const toColumn = (col) => {
    return `
        <div class="column">
         ${col}
        </div>
    `
}
const createRows = (index, content) => {
    return `
        <div class="row">
          <div class="row-info">${index ? index : ''}</div>
          <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODESLETTERS.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODESLETTERS.Z - CODESLETTERS.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn) //(el, index) => createColumn(el)
        .join('')
    rows.push(createRows(null, cols))
    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount).fill('').map(toCell).join('')
        rows.push(createRows(i + 1, cells))
    }
    return rows.join('')
}

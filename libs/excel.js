import excelJS from 'exceljs'
import saveAs from 'file-saver'

export function downloadExcel (header, data, file_name, tab_name) {

    // Create workbook
    const workbook = new excelJS.Workbook()
    const worksheet = workbook.addWorksheet(tab_name)

    // Populate header
    let row = worksheet.getRow(1)
    header.forEach((field, i) => {
        row.getCell(i + 1).value = field
    })

    // Populate data
    data.forEach((obj, i) => {
        let row = worksheet.getRow(i + 2)
        header.forEach((field, j) => {
            row.getCell(j + 1).value = data[i][field]
        })
    })

    // Set auto-filter
    worksheet.autoFilter = {
        from: { row: 1, column: 1 },
        to: { row: 1, column: header.length }
    }

    // Set freeze pane
    worksheet.views = [
        { state: 'frozen', xSplit: 0, ySplit: 1 }
    ]

    // Styling
    worksheet.getRow(1).font = { bold: true }
    worksheet.getRow(1).alignment = { horizontal: 'center' }
    worksheet.columns.forEach(col => col.width = getMaxWidth(col))

    // Download file
    workbook.xlsx.writeBuffer().then((data) => {
        var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
        saveAs(blob, file_name)
    })
}

function getMaxWidth(col) {
    let maxWidth = 0

    col.values.forEach(val => {
        let cellWidth = val.length
        if (cellWidth > maxWidth) {
            maxWidth = cellWidth
        }
    })

    return maxWidth
}
export function paginate(currentPage, pageCount, siblingCount) {
    let result = []
    if (currentPage > 1) {
        result.push('<')
    }

    if (currentPage > 1) {
        result.push(1)
    }

    if (currentPage - siblingCount > 2) {
        result.push('...')
    }

    for (let i = currentPage - siblingCount; i < currentPage; i++) {
        if (i > 1) {
            result.push(i)
        }
    }

    result.push(currentPage)

    for (let i = currentPage + 1; i <= currentPage + siblingCount; i++) {
        if (i < pageCount) {
            result.push(i)
        }
    }

    if (pageCount - currentPage - siblingCount > 1) {
        result.push('...')
    }

    if (pageCount - currentPage > 0) {
        result.push(pageCount)
        result.push('>')
    }

    return result
}
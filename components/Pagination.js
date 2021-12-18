import { Pagination } from 'react-bootstrap'
import { paginate } from '../libs'

export default (props) => {
    const { currentPage, itemCount, pageSize, siblingCount, onClick } = props

    const pageCount = Math.ceil(itemCount / pageSize)
    const pageItemArray = paginate(currentPage, pageCount, siblingCount)

    const handleClick = (pageNum) => {
        onClick(pageNum)
    }

    const createPageItem = (pageNum) => {
        return (
            <Pagination.Item
                key={pageNum}
                onClick={() => handleClick(pageNum)}
                active={pageNum === currentPage}
            >
                {pageNum}
            </Pagination.Item>
        )
    }

    return (
        <Pagination className='mt-3'>
            {
                pageItemArray.map((item, index) => {
                    switch (item) {
                        case '<':
                            return (
                                <Pagination.Prev
                                    key='prev'
                                    onClick={() => handleClick(currentPage - 1)}
                                >
                                    {'<'}
                                </Pagination.Prev>
                            )

                        case '>':
                            return (
                                <Pagination.Next
                                    key='next'
                                    onClick={() => handleClick(currentPage + 1)}
                                >
                                    {'>'}
                                </Pagination.Next>
                            )

                        case '...':
                            return (
                                <Pagination.Ellipsis
                                    key={`dot-${index}`}
                                    disabled
                                />
                            )

                        default:
                            return (
                                createPageItem(item)
                            )
                    }
                })
            }
        </Pagination >
    )
}
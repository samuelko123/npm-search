import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { RiFileExcel2Fill } from 'react-icons/ri'

export default (props) => {
    const { onClick } = props
    const [color, setColor] = useState('#1D6F42')
    const [isLoading, setIsLoading] = useState(false)

    const handleFocus = () => {
        setColor('#ffffff')
    }

    const handleBlur = () => {
        setColor('#1D6F42')
    }

    const handleClick = () => {
        setIsLoading(true)
        onClick()
        setIsLoading(false)
    }

    return (
        <Button
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            onClick={handleClick}
            variant='outline-primary'
            className='p-2'
        >
            {
                !isLoading &&
                <RiFileExcel2Fill size={30} color={color} />
            }
            {
                !!isLoading &&
                <span>Loading...</span>
            }

        </Button>
    )
}
import { useState, useEffect, useRef } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'

export default (props) => {
    const { placeholderText, buttonText, onSubmit, autoFocus } = props
    const inputElement = useRef(null)
    const [text, setText] = useState('')

    useEffect(() => {
        if (autoFocus && inputElement.current) {
            inputElement.current.focus()
        }
    }, [autoFocus])

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(text)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Label visuallyHidden>
                    {placeholderText}
                </Form.Label>
                <FormControl
                    placeholder={placeholderText}
                    onChange={handleChange}
                    ref={inputElement}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Button type='submit'>
                    {buttonText}
                </Button>
            </Form.Group>
        </Form>
    )
}
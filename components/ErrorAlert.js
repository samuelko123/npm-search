import { useState } from 'react'
import { Alert } from 'react-bootstrap'

export default (props) => {
    const { message } = props

    const [show, setShow] = useState(true)

    if (show) {
        return (
            <Alert
                variant='danger'
                onClose={() => setShow(false)}
                dismissible
            >
                <Alert.Heading>Oops! Something went wrong!</Alert.Heading>
                <p>{message}</p>
            </Alert>
        )
    } else {
        return null
    }
}
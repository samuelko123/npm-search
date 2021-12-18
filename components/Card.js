import { Card } from 'react-bootstrap'

export default (props) => {
    const { title, body } = props
    
    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{body}</Card.Text>
            </Card.Body>
        </Card>
    )
}
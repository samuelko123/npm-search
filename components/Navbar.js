import { Navbar } from 'react-bootstrap'

export default (props) => {
    const { title } = props
    
    return (
        <Navbar bg='primary' variant='dark' className='p-3'>
            <Navbar.Brand href='/'>{title}</Navbar.Brand>
        </Navbar>
    )
}
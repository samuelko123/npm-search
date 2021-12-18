import { Spinner } from 'react-bootstrap'
import styles from '../styles/Spinner.module.css'

export default () => {
    return (
        <Spinner
            variant='primary'
            animation='border'
            role='status'
            className={styles.spinner}
        >
            <span className='visually-hidden'>Loading...</span>
        </Spinner>
    )
}
import Head from 'next/head'
import NavBar from './Navbar'
import styles from '../styles/Layout.module.css'
import { Container } from 'react-bootstrap'

export default (props) => {
    const { title, children } = props

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <NavBar title={title} />
            <Container className={styles.container}>
                {children}
            </Container>
        </>
    )
}
import { Layout } from '../components'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.scss'

export default ({ Component, pageProps }) => {
  return (
    <Layout title='npm search'>
      <Component {...pageProps} />
    </Layout>
  )
}

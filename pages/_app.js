import Header from '../components/Header'
import Footer from '../components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Header {...pageProps} />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}

export default MyApp

import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from '../components/Footer'

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

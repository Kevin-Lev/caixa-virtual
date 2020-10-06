import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
// import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    );
}

export default MyApp;

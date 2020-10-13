import CredentialsForm from '../components/credentialsForm'

const Login = () => {
    return <CredentialsForm formType={'Login'} />
}

export default Login

Login.getInitialProps = () => {
    return {
        hide: true
    }
}

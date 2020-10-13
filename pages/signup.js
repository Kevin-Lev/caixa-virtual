import CredentialsForm from '../components/credentialsForm'

const Signup = (hide) => {
    return <CredentialsForm formType={'SignUp'} />
}

export default Signup

Signup.getInitialProps = () => {
    return {
        hide: true
    }
}

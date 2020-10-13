import React, { useState, useEffect } from 'react'
import cookie from 'js-cookie'
import { Container, Row, Button, Form, Alert } from 'react-bootstrap'
import Link from 'next/link'
import Router from 'next/router'

const jwt = require('jsonwebtoken')
const jwtSecret = 'SUPERSECRETE20220'

const CredentialsForm = (props) => {
    const [form, setForm] = useState({ email: '', password: '' })
    const [credentialsError, setCredentialsError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                execCredentials()
                setIsSubmitting(false)
            }
        }
    })

    function handleSubmit(e) {
        e.preventDefault()
        let errs = validate()
        setErrors(errs)
        setIsSubmitting(true)
    }

    const execCredentials = async () => {
        fetch(
            props.formType === 'SignUp'
                ? `${process.env.API_URL}/api/usuarios`
                : `${process.env.API_URL}/api/auth`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                })
            }
        )
            .then((r) => r.json())
            .then((data) => {
                if (data && data.error) {
                    setCredentialsError(data.message)
                }
                if (data && data.token) {
                    //set cookie
                    cookie.set('token', data.token, { expires: 150 })
                    if (props.formType === 'SignUp') {
                        setShowAlert(true)
                    } else {
                        const token = data.token.split(' ')
                        const decodedToken = jwt.verify(token[0], jwtSecret)
                        Router.push(`/usuarios/${decodedToken.userId}`)
                    }
                }
            })
    }

    const validate = () => {
        let err = {}

        if (!form.email) {
            err.email = 'Você precisa inserir o seu e-mail.'
        }

        if (!form.password) {
            err.password = 'Você precisa inserir uma senha.'
        }

        return err
    }

    const handleChange = (event) => {
        console.log('formType')
        console.log(props.formType)
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Container style={{ marginTop: 170, marginBottom: 170 }}>
            <Row className="justify-content-center">
                <Form onSubmit={handleSubmit}>
                    <h4 style={{ textAlign: 'center' }}>
                        {' '}
                        {props.formType === 'SignUp' ? 'Cadastro de Usuário' : 'Login'}
                    </h4>
                    <Form.Group controlId="formCat">
                        <Form.Control
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            onChange={handleChange}
                            isInvalid={errors.email || credentialsError}
                            isValid={form.email && !credentialsError}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        <Form.Text className="text-muted">Digite o seu e-mail.</Form.Text>
                        <Form.Control
                            type="password"
                            placeholder="Senha"
                            name="password"
                            onChange={handleChange}
                            isInvalid={errors.password || credentialsError}
                            isValid={form.password && !credentialsError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password || credentialsError}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">Digite a sua senha.</Form.Text>
                    </Form.Group>
                    <Row className="justify-content-center">
                        <Button variant="success" type="submit">
                            {props.formType === 'SignUp' ? 'Cadastrar usuário' : 'Login'}
                        </Button>
                    </Row>
                    {props.formType === 'SignUp' ? (
                        <Row className="justify-content-center">
                            <Link href="/login">
                                <Button variant="primary" style={{ marginTop: '15px' }}>
                                    Voltar para a tela de login
                                </Button>
                            </Link>
                        </Row>
                    ) : (
                        <Row className="justify-content-center">
                            <Link href="/signup">
                                <Button variant="primary" style={{ marginTop: '15px' }}>
                                    Cadastre-se
                                </Button>
                            </Link>
                        </Row>
                    )}
                </Form>
            </Row>
            <Row className="justify-content-center">
                <Alert
                    show={showAlert}
                    dismissible
                    style={{ marginTop: 30 }}
                    variant="success"
                    onClose={() => setShowAlert(false)}>
                    Você foi cadastrado com sucesso! <Link href="/login">Clique aqui</Link> para
                    fazer o seu login!
                </Alert>
            </Row>
        </Container>
    )
}

export default CredentialsForm

CredentialsForm.getInitialProps = () => {
    return {
        hide: true,
        formType
    }
}

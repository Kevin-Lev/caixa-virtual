import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import { Container, Row, Button, Form, Alert } from 'react-bootstrap';
import Link from 'next/link';

const jwt = require('jsonwebtoken');
const jwtSecret = 'SUPERSECRETE20220';

const Login = (hide) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                execLogin();
                setIsSubmitting(false);
            }
        }
    });

    const execLogin = async () => {
        await fetch(`${process.env.API_URL}/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        })
            .then((r) => {
                return r.json();
            })
            .then(async (data) => {
                if (data && data.error) {
                    setLoginError(data.message);
                }
                if (data && data.token) {
                    //set cookie
                    cookie.set('token', data.token, { expires: 2147483647 });
                    const token = data.token.split(' ');
                    const decodedToken = jwt.verify(token[0], jwtSecret);
                    console.log(decodedToken);
                    Router.push(`/usuarios/${decodedToken.userId}`);
                }
            });
    };

    function handleSubmit(e) {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);

        setIsSubmitting(true);
    }

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const validate = () => {
        let err = {};

        if (!form.email) {
            err.email = 'Você precisa inserir o seu e-mail.';
        }

        if (!form.password) {
            err.password = 'Você precisa inserir uma senha.';
        }

        return err;
    };

    return (
        <Container style={{ marginTop: 170, marginBottom: 170 }}>
            <Row className="justify-content-center">
                <Form onSubmit={handleSubmit}>
                    <h4 style={{ textAlign: 'center' }}>Login</h4>
                    <Form.Group controlId="formCat">
                        <Form.Control
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            onChange={handleChange}
                            isInvalid={errors.email || loginError}
                            isValid={form.email && !loginError}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        <Form.Text className="text-muted">Digite o seu e-mail.</Form.Text>
                        <Form.Control
                            type="password"
                            placeholder="Senha"
                            name="password"
                            onChange={handleChange}
                            isInvalid={errors.password || loginError}
                            isValid={form.password && !loginError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password || loginError}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">Digite a sua senha.</Form.Text>
                    </Form.Group>
                    <Row className="justify-content-center">
                        <Button variant="success" type="submit">
                            Login
                        </Button>
                    </Row>
                </Form>
            </Row>
            <Row className="justify-content-center" style={{ marginTop: '15px' }}>
                <Link href="/signup">
                    <Button variant="primary">Cadastre-se</Button>
                </Link>
            </Row>
        </Container>
    );
};

export default Login;

Login.getInitialProps = () => {
    return {
        hide: true
    };
};

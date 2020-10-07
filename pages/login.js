import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

const jwt = require('jsonwebtoken');
const jwtSecret = 'SUPERSECRETE20220';

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        //call api
        fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((r) => {
                return r.json();
            })
            .then((data) => {
                if (data && data.error) {
                    setLoginError(data.message);
                }
                if (data && data.token) {
                    //set cookie
                    console.log('data')
                    console.log(data)
                    cookie.set('token', data.token, { expires: 15 });
                    const token = data.token.split(' ')
                    console.log(token)
                    const decodedToken = jwt.verify(token[0], jwtSecret)
                    console.log(decodedToken)
                    Router.push(`/${decodedToken.userId}`);
                }
            });
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>Login</p>
            <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Submit" />
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        </form>
    );
};

export default Login;

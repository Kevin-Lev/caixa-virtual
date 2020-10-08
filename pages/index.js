import Link from 'next/link';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';

export default function Home(hide) {
    return (
        <Container className="mx-auto" style={{ marginTop: 100 }}>
            <Jumbotron>
                <h1>Bem-vindo ao vCaixa.dev!</h1>
                <h6>O que você deseja fazer agora?</h6>
                <Row style={{ marginTop: 30 }}>
                    <Col sm={6}>
                        <Link href="/login">
                            <Button variant="success"> Quero fazer Login</Button>
                        </Link>
                    </Col>
                    <Col sm={6}>
                        <Link href="/signup">
                            <Button variant="primary">Quero me cadastrar</Button>
                        </Link>
                    </Col>
                </Row>
            </Jumbotron>
        </Container>
    );
}

Home.getInitialProps = () => {
    return {
        hide: true
    };
};

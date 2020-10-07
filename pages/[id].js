import Link from 'next/link';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';

export default function Home( id ) {
    console.log('id HOME')
    console.log(id.id)
    const userId = id.id
    return (
        <>
            <Header userId={userId} />
            <Container className="mx-auto" style={{ marginTop: 100 }}>
                <Jumbotron>
                    <h1>Bem-vindo à sua Caixa Virtual UESSSSS!</h1>
                    <h6>O que você deseja fazer agora?</h6>
                    {/* <Row style={{ marginTop: 30 }}>
            <Col sm={6}>
                <Link href="http://localhost:3000/ceps/new">
                <Button variant="success">Quero cadastrar o meu CEP</Button>
                </Link>
            </Col>
            <Col sm={6}>
                <Link href="http://localhost:3000/ceps">
                <Button variant="primary">Me mostre a lista de CEPs</Button>
                </Link>
            </Col>
            </Row> */}
                </Jumbotron>
            </Container>
            </>
    );
}

Home.getInitialProps = async ({ query: id  }) => {

    return id
};



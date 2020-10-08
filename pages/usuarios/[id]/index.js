import Link from 'next/link';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/Header';

export default function Usuario(props) {
    console.log('id Usuário');
    console.log(props.id);
    console.log('id Caixa');
    console.log(props.idCaixa);

    return (
        <>
            <Header {...props} />
            <Container className="mx-auto" style={{ marginTop: 100 }}>
                <Jumbotron>
                    <h1>Bem-vindo à sua Caixa Virtual !</h1>
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

Usuario.getInitialProps = async ({ query: id }) => {
    const idUser = id.id;
    const res = await fetch(`http://localhost:3000/api/usuarios/${idUser}`);
    const { data } = await res.json();

    console.log('data');
    console.log(data);

    return {
        id: data._id,
        idCaixa: data.caixa
    };
};

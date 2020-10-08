import Link from 'next/link';
import { Jumbotron, Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../../../components/Header';

export default function Usuario(props) {
    
    return (
        <>
            <Header {...props} />
            <Container className="mx-auto" style={{ marginTop: 100 }}>
                <Jumbotron>
    <h2>Bem-vindo à sua Caixa Virtual, {props.email.split('@')[0]}!</h2>
                    <h6>O que você deseja fazer agora?</h6>
                    <Row style={{ marginTop: 30 }}>
            <Col sm={4}>
                            <Link href={`${process.env.API_URL}/usuarios/caixa/${props.idCaixa}/newMovimentacao`}>
                <Button variant="success">Simular uma movimentação</Button>
                </Link>
            </Col>
            <Col sm={4}>
                <Link href={`${process.env.API_URL}/usuarios/caixa/${props.idCaixa}`}>
                                <Button variant="primary">Ver a lista de movimentações</Button>
                </Link>
            </Col>
            <Col sm={4}>
                            <Link href={`${process.env.API_URL}/usuarios/caixa/${props.idCaixa}/categorias/new`}>
                <Button variant="info">Adicionar categoria</Button>
                </Link>
            </Col>
            </Row>
                </Jumbotron>
            </Container>
        </>
    );
}

Usuario.getInitialProps = async ({ query: id }) => {

    const idUser = id.id
    const res = await fetch(`${process.env.API_URL}/api/usuarios/${idUser}`);
    const { data } = await res.json();

    console.log('data');
    console.log(data);

    return {
        id: data._id,
        email: data.email,
        idCaixa: data.caixa
    }
};

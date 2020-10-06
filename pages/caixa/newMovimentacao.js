import { Container, Card, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function newMovimentacao({ caixa, categorias }) {
    const [form, setForm] = useState({ name: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [insertedMove, setInsertedMove] = useState('');
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    // useEffect(() => {
    //     if (isSubmitting) {
    //         if (Object.keys(errors).length === 0) {
    //             createMovimentacao();
    //             setIsSubmitting(false);
    //         }
    //     }
    // });

    const handleSubmit = (event) => {
        event.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
        // setInsertedMove(form.name)
        if (Object.keys(errs).length === 0 && errs.constructor === Object) {
            setShowAlert(true);
        }
    };

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };    


    const validate = () => {
        let err = {};

        if (!form.descricao) {
            err.descricao = 'Você precisa inserir uma descrição.';
        }

        if (!form.valor) {
            err.valor = 'Você precisa inserir um valor.';
        }

        return err;
    };

    const saldoUpdate = () => {

        if (form.tipo === "ENTRADA") {

        }
    }

    const createMovimentacao = async ({ query: { id } }) => {
        try {
            const res = await fetch(`http://localhost:3000/api/caixa/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <Container>
            <Card border="dark">
                <Card.Header>
                    <Card.Title>Nova movimentação</Card.Title>
                </Card.Header>
                {/* <Row noGutters > */}
                {/* </Row> */}
                <Card.Body>
                    <Card.Subtitle>
                        Preencha os dados do formulário para adicionar um movimento para o seu
                        caixa.
                    </Card.Subtitle>

                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-start ml-auto">
                            <Form.Group controlId="formMove">
                                <Form.Control
                                    as="select"
                                    name="categoria"
                                    onChange={handleChange}
                                    isInvalid={errors.categoria}
                                    isValid={form.categoria}>
                                    {categorias.map(cat => 
                                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                                    )}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.categoria}
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    Selecione a categoria.
                                        </Form.Text>
                                    <Form.Control
                                        name="descricao"
                                        type="text"
                                        placeholder="Descrição"
                                        onChange={handleChange}
                                        isInvalid={errors.descricao}
                                        isValid={form.descricao}></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.descricao}
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        Insira uma descrição para a movimentação.
                                        </Form.Text>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            as="select"
                                            name="tipo"
                                            onChange={handleChange}
                                            isInvalid={errors.tipo}
                                            isValid={form.tipo}>
                                            <option>ENTRADA</option>
                                            <option>SAÍDA</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.tipo}
                                        </Form.Control.Feedback>
                                        <Form.Text className="text-muted">
                                            Selecione o tipo de movimentação.
                                        </Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            name="valor"
                                            type="number"
                                            step="0.01"
                                            placeholder="R$ 00.00"
                                            onChange={handleChange}
                                            isInvalid={errors.valor}
                                            isValid={form.valor}></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.tipo}
                                        </Form.Control.Feedback>
                                        <Form.Text className="text-muted">
                                            Digite o valor da movimentação.
                                        </Form.Text>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Row>
                        <Row className="justify-content-end">
                            <Button variant="success" type="submit">
                                Cadastrar Movimentação
                            </Button>
                        </Row>
                    </Form>
                    <Row className="justify-content-center">
                        <Alert
                            show={showAlert}
                            dismissible
                            style={{ marginTop: 30 }}
                            variant="success"
                            onClose={() => setShowAlert(false)}>
                            A movimentação foi cadastrada com sucesso!{' '}
                        </Alert>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

newMovimentacao.getInitialProps = async ({ query: {id} }) => {
    const res = await fetch(`http://localhost:3000/api/caixa/${id}`)
    const caixaJson = await res.json()

    const categoriaRes = await fetch('http://localhost:3000/api/categorias')
    const { data } = await categoriaRes.json()

    console.log(caixaJson.data)

    return {
        caixa: caixaJson.data,
        categorias: data
    }
}

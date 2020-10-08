import { Container, Card, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function newMovimentacao({ caixa, categorias }) {
    const formCatValue = categorias && categorias.length ? categorias[0]._id : null;

    const [form, setForm] = useState({
        categoria: formCatValue,
        tipo: 'ENTRADA',
        valor: 0.0,
        descricao: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [insertedMove, setInsertedMove] = useState('');
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createMovimentacao();
                setIsSubmitting(false);
            }
        }
    });

    const handleSubmit = (event) => {
        console.log('HANDLE SUBMIT');
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
        console.log(event.target.value);
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

    const bodyUpdate = () => {
        console.log(typeof caixa.saldoTotal);
        console.log(typeof form.valor);

        // caixa.saldoTotal = parseFloat(caixa.saldoTotal)

        if (form.tipo === 'ENTRADA') {
            caixa.saldoTotal += parseFloat(form.valor);
        } else {
            caixa.saldoTotal -= parseFloat(form.valor);
        }

        caixa.movimentacoes.push({
            data: Date.now(),
            id: idGenerator(),
            categoria: form.categoria,
            tipo: form.tipo,
            valor: form.valor,
            descricao: form.descricao
        });

        console.log('updatedCaixa');
        console.log(caixa);
        return caixa;
    };

    const idGenerator = () =>
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const createMovimentacao = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/caixa/${caixa._id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyUpdate())
            });
            console.log('res');
            console.log(res);
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
                <Card.Body>
                    <Card.Subtitle>
                        Preencha os dados do formulário para adicionar um movimento para o seu
                        caixa. Campos com * são obrigatórios.
                    </Card.Subtitle>

                    <Form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
                        <Row className="justify-content-start ml-auto">
                            <Form.Group controlId="formMove">
                                <Form.Control
                                    as="select"
                                    name="categoria"
                                    onChange={handleChange}
                                    isInvalid={errors.categoria}
                                    isValid={form.categoria}>
                                    {categorias.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.categoria}
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    Selecione a categoria, se alguma foi cadastrada no sistema.
                                </Form.Text>
                                <Form.Control
                                    name="descricao"
                                    type="text"
                                    placeholder="Descrição"
                                    onChange={handleChange}
                                    isInvalid={errors.descricao}
                                    isValid={form.descricao}
                                    style={{ marginTop: '15px' }}></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.descricao}
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    * Insira uma descrição para a movimentação.
                                </Form.Text>
                                <Row style={{ marginTop: '15px' }}>
                                    <Col>
                                        <Form.Control
                                            as="select"
                                            name="tipo"
                                            onChange={handleChange}
                                            isInvalid={errors.tipo}
                                            isValid={form.tipo}>
                                            <option value="ENTRADA">ENTRADA</option>
                                            <option value="SAÍDA">SAÍDA</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.tipo}
                                        </Form.Control.Feedback>
                                        <Form.Text className="text-muted">
                                            * Selecione o tipo de movimentação.
                                        </Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            name="valor"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="R$ 00.00"
                                            onChange={handleChange}
                                            isInvalid={errors.valor}
                                            isValid={form.valor}></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.valor || errors.notOnlyNumbers}
                                        </Form.Control.Feedback>
                                        <Form.Text className="text-muted">
                                            * Digite o valor da movimentação.
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
                </Card.Body>
            </Card>
            <Row className="justify-content-center">
                <Alert
                    show={showAlert}
                    dismissible
                    style={{ marginTop: 30 }}
                    variant="success"
                    onClose={() => setShowAlert(false)}>
                    A movimentação foi cadastrada com sucesso!{' '}
                    <Link href={`/usuarios/caixa/${caixa._id}`}>Clique aqui</Link> para vê-lo na
                    lista de registros!
                </Alert>
            </Row>
        </Container>
    );
}

newMovimentacao.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/caixa/${id}`);
    const caixaJson = await res.json();

    const categoriaRes = await fetch('http://localhost:3000/api/categorias');
    const { data } = await categoriaRes.json();

    return {
        idCaixa: caixaJson.data._id,
        caixa: caixaJson.data,
        categorias: data
    };
};

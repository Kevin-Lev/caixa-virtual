import { useEffect, useState } from 'react'
import { Container, Row, Button, Form, Alert } from 'react-bootstrap'

export default function NewCategoria() {
    const [form, setForm] = useState({ name: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [insertedCategory, setInsertedCategory] = useState('')
    const [errors, setErrors] = useState({})
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createCategoria()
                setIsSubmitting(false)
            }
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        let errs = validate()
        setErrors(errs)
        setIsSubmitting(true)
        setInsertedCategory(form.name)
        if (Object.keys(errs).length === 0 && errs.constructor === Object) {
            setShowAlert(true)
        }
    }

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const validate = () => {
        let err = {}

        if (!form.name) {
            err.name = 'Você precisa inserir um nome para a categoria.'
        }

        return err
    }

    const createCategoria = async () => {
        try {
            const res = await fetch(`${process.env.API_URL}/api/categorias`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Container style={{ marginTop: 170, marginBottom: 170 }}>
                <Row className="justify-content-center">
                    <Form onSubmit={handleSubmit}>
                        <h4>Cadastro de Categoria</h4>
                        <Form.Group controlId="formCat">
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                name="name"
                                onChange={handleChange}
                                isInvalid={errors.name}
                                isValid={form.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Digite um nome para a categoria.
                            </Form.Text>
                        </Form.Group>
                        <Row className="justify-content-center">
                            <Button variant="success" type="submit">
                                Cadastrar Categoria
                            </Button>
                        </Row>
                    </Form>
                </Row>
                <Row className="justify-content-center">
                    <Alert
                        show={showAlert}
                        dismissible
                        style={{ marginTop: 30 }}
                        variant="success"
                        onClose={() => setShowAlert(false)}>
                        A categoria {insertedCategory} foi cadastrada com sucesso!{' '}
                    </Alert>
                </Row>
            </Container>
        </>
    )
}

NewCategoria.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${process.env.API_URL}/api/caixa/${id}`)
    const { data } = await res.json()

    return {
        idCaixa: data._id
    }
}

import { Table, Container, Row } from 'react-bootstrap';
import moment from 'moment';

const MovimentacoesList = ({ caixa }) => (
    <Container style={{ marginTop: 120, marginBottom: '20%', width: '60%' }}>
        <Row className="justify-content-center">
            <h4>Lista de movimentações do caixa</h4>
        </Row>
        <Row className="justify-content-center">
            <Table
                style={{ textAlign: 'center' }}
                responsive
                size="sm"
                striped
                bordered
                hover
                variant="dark">
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>ID da movimentação</th>
                        <th>Saldo total</th>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>ID da Categoria</th>
                        <th>Nome da Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                {caixa.movimentacoes.map((row) => (
                    <tbody key={row.id}>
                        <tr>
                            {/* <td>{caixa._id}</td> */}
                            <td>{row.id}</td>
                            <td>{caixa.saldoTotal}</td>
                            <td>{row.tipo}</td>
                            <td>{row.descricao}</td>
                            <td>{row.valor}</td>
                            <td>{row.categoria._id}</td>
                            <td>{row.categoria.name}</td>
                            <td>{moment(row.data).format('DD-MM-YYYY HH:MM')}</td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </Row>

        <style jsx>
            {`
                tr th {
                    text-align: center;
                }
            `}
        </style>
    </Container>
);

export default MovimentacoesList;

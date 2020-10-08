import { Table, Container, Row } from 'react-bootstrap';
import moment from 'moment';

const MovimentacoesList = ({ caixa }) => (
    <Container style={{ marginTop: 120, marginBottom: '20%', width: '80%' }}>
        <Row className="justify-content-center">
            <h4>Lista de movimentações do dia</h4>
        </Row>
        <Row className="justify-content-center">
            <h6>Emitida em: {moment(Date.now()).format('DD-MM-YYYY HH:MM')}</h6>
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
                        <th>Saldo total</th>
                        <th>Data</th>
                        <th>ID da movimentação</th>
                        <th>ID da Categoria</th>
                        <th>Nome da Categoria</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                {caixa.movimentacoes.map((row) => (
                    <tbody key={row.id}>
                        <tr>
                            <td>{caixa.saldoTotal}</td>
                            <td>{moment(row.data).format('DD-MM-YYYY HH:MM')}</td>
                            <td>{row.id}</td>
                            <td>{row.categoria ? row.categoria._id : 'Sem categoria'}</td>
                            <td>{row.categoria ? row.categoria.name : 'Sem categoria'}</td>
                            <td>{row.tipo}</td>
                            <td>{row.valor}</td>
                            <td>{row.descricao}</td>
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

import MovimentacoesList from '../../../components/MovimentacoesList';
import fetch from 'isomorphic-unfetch';

export default function MovimentaList({ caixa }) {
    return (
        <div>
            <MovimentacoesList caixa={caixa} />
        </div>
    );
}

MovimentaList.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/caixa/${id}`);
    const { data } = await res.json();

    // Para buscar id e nome da categoria de cada movimentação feita
    for (let i = 0; i < data.movimentacoes.length; i++) {
        const categoriaRes = await fetch(
            `http://localhost:3000/api/categorias/${data.movimentacoes[i].categoria}`
        );

        const catJson = await categoriaRes.json();

        data.movimentacoes[i].categoria = catJson.data;
    }

    return {
        caixa: data,
        idCaixa: data._id
    };
};

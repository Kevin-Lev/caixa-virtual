import MovimentacoesList from '../../components/MovimentacoesList';
import fetch from 'isomorphic-unfetch';

export default function MovimentaList({ caixa }) {
    return (
        <div>
            <MovimentacoesList caixa={caixa} />
        </div>
    );
}

MovimentaList.getInitialProps = async ({ query: { id } }) => {
    console.log(`http://localhost:3000/api/caixa/${id}`)
    const res = await fetch(`http://localhost:3000/api/caixa/${id}`);
    const { data } = await res.json();

    return {
        caixa: data
    };
};
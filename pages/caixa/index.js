import MovimentacoesList from '../../components/MovimentacoesList';
import fetch from 'isomorphic-unfetch';

export default function MovimentacoesList({ caixa }) {
    return (
        <div>
            <MovimentacoesList caixa={caixa} />
        </div>
    );
}

MovimentacoesList.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/caixa/');
    const { data } = await res.json();

    return {
        caixa: data
    };
};
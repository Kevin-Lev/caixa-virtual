import MovimentacoesList from '../../../components/MovimentacoesList'
import fetch from 'isomorphic-unfetch'

export default function MovimentaList({ caixa }) {
    return (
        <div>
            <MovimentacoesList caixa={caixa} />
        </div>
    )
}

MovimentaList.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${process.env.API_URL}/api/caixa/${id}`)
    const { data } = await res.json()

    return {
        caixa: data,
        idCaixa: data._id
    }
}

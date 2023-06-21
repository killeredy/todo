export default function Chamado({chamado, action, setCurrent}){

    const setCurrentDb = ()=>{

    }

    return(
        <tr>
            <td>{chamado.numero} </td>
            <td>{chamado.duracao}h</td>
            <td>{chamado.descricao}</td>
            <td>
                <button className="btn btn-info" onClick={(e)=> setCurrent(chamado.numero)}>Editar</button>
            </td>
            <td>
                <button className="btn btn-danger" onClick={(e)=> action(chamado.numero)} >Delete</button>
            </td>
        </tr>
    )
}
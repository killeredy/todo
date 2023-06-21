import Chamado from "./Chamado";

export default function ChamadosList({list, actionChamados, setCurrent}){
    return(
        <div className="p-5 text-white">
            <h3>Chamados</h3>
            <table className="table text-white">
                <thead>
                    <tr>
                        <th>Chamado</th>
                        <th>Duração</th>
                        <th>Descrição</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((e, i)=> <Chamado key={i} chamado={e}  action={actionChamados} setCurrent={setCurrent}  /> )}
                </tbody>

            </table>
        </div>
    )
}
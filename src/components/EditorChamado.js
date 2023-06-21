import { useState } from 'react';

export default function EditorChamado({ chamado, addChamado, isNew = false }) {

    const vazio = {
        numero: 0,
        duracao: 0,
        descricao: ''

    }


    const max = (7 * 15);
    const [newChamado, setNewChamado] = useState(!chamado ? { ...vazio } : chamado);

    const addTime = (value) => {
        const dur = newChamado.duracao;
        let newDuracao = dur + parseInt(value);
        newDuracao = newDuracao > max ? max : newDuracao;
        setNewChamado({ ...newChamado, duracao: newDuracao })
    }

    const addNumero = (value) => {
        setNewChamado({ ...newChamado, numero: value })
    }

    const addDesc = (value) => {
        setNewChamado({ ...newChamado, descricao: value })
    }

    const add = () => {
        addChamado(newChamado);
        setNewChamado({
            numero: 0,
            duracao: 0,
            descricao: '',
        })
    }

    const salvar = () => {
        addChamado(newChamado);
        setNewChamado({
            numero: 0,
            duracao: 0,
            descricao: '',
        })
    }


    return (
        <div className="w-100 bg-white p-5" style={{ borderRadius: '10px 10px 0 0' }}>
            <h4>Editar Chamado</h4>
            <div className="row">


                <div className='row'>
                    <div className="my-2 col-2 m-0">
                        <label className="me-3" htmlFor="numero">Numero</label><br />
                        <input className='w-100' type="number" name="numero" alt="" value={newChamado.numero} onChange={(e) => addNumero(e.target.value)} />
                    </div>
                    <div className="my-2 col-10 m-0">
                        <label className="me-3" htmlFor="numero">Descricao</label><br />
                        <textarea className="w-100" onChange={(e) => addDesc(e.target.value)} value={newChamado.descricao} rows={1}></textarea>
                    </div>
                </div>

                <div className="row gap-2 my-2 w-100">

                    <div className="col-2 h-100 row">
                        <label className="me-3" htmlFor="numero">Duração</label>
                        <h2 className='btn btn-info'><b>{newChamado.duracao}</b></h2>
                        <input type="hidden" name="numero" value={newChamado.duracao} />
                    </div>

                    <div className="row gap-2 col-10 row-cols-4">
                        <button className="btn btn-success p-0" onClick={(e) => { addTime(e.target.value) }} value={1}>+ 1 Hora</button>
                        <button className="btn btn-success p-0" onClick={(e) => { addTime(e.target.value) }} value={7}>+ 1 Dia</button>
                        <button className="btn btn-success p-0" onClick={(e) => { addTime(e.target.value) }} value={35}>+ 1 Semana</button>
                    </div>


                </div>


            </div>
            <div>
                {
                    isNew ?
                        <button className="btn btn-success mx-auto d-block" onClick={() => add()}>Criar</button>
                        :
                        <button className="btn btn-success mx-auto d-block" onClick={() => salvar()}>Salvar</button>

                }
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import DiasChamados from "./DiasChamado";


export default function CalendarioChamados({ chamados , setCalendario, totalHoras, horasInativas = 0}) {




    const handleSetCalendario = (idSemana, idDia) => {
        idSemana = idSemana !== null ?  parseInt(idSemana) : 0;
        idDia = idDia !== null ?  parseInt(idDia) : 0;
        let newCalendario = [...chamados];
        let ativo = newCalendario[idSemana]['dias'][idDia]['ativo'];
        newCalendario[idSemana]['dias'][idDia]['ativo'] = !ativo;
        // setCalendario(newCalendario);
    }


  
    let firstDay = 18;
    let data;
    const semanas = chamados.map((e, i) => {
        let dias = (i + 1) + (i * 4);
        data = (i + 1) + (i * 6) + firstDay;
        return <DiasChamados key={i} dataShow={data} dia={i} calend={e} setCalendario={setCalendario} ></DiasChamados>
    })

    return (
        <div className="p-5 d-flex ">
           {semanas}
           <div className="text-white text-center">
            <h2>{totalHoras}</h2>
            <p>horas feiras</p>
            <small>{(7*5*3) - horasInativas} a fazer</small>
           </div>
        </div>
    )
}
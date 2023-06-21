import { useEffect, useState } from "react";
import DiasChamados from "./DiasChamado";


export default function CalendarioChamados({ chamados , setCalendario}) {



    // const [calendario, setCalendario] = useState(chamados);

    const handleSetCalendario = (idSemana, idDia) => {
        idSemana = idSemana !== null ?  parseInt(idSemana) : 0;
        idDia = idDia !== null ?  parseInt(idDia) : 0;
        let newCalendario = [...chamados];
        let ativo = newCalendario[idSemana]['dias'][idDia]['ativo'];
        newCalendario[idSemana]['dias'][idDia]['ativo'] = !ativo;
        setCalendario(newCalendario);
    }




    const Semana = ({ diasShow, dataShow, calend, idSemana, setCalendario }) => {
        let diasRender = calend.dias.map((e, i) => {
            return <DiasChamados key={i} diasShow={diasShow} dataShow={dataShow} idDia={i} calend={e} idSemana={idSemana} setCalendario={setCalendario} ></DiasChamados>
        })
        return <div className="d-flex" style={{ width: "30%" }}>{diasRender}</div>

    }

   
    let firstDay = 18;
    let data;
    const semanas = chamados.map((e, i) => {
        let dias = (i + 1) + (i * 4);
        data = (i + 1) + (i * 6) + firstDay;
        return <Semana key={i} diasShow={dias} dataShow={data} calend={e} setCalendario={handleSetCalendario} idSemana={i}></Semana>
    })



    return (
        <div className="p-5 d-flex gap-3">
            {semanas}
        </div>
    )
}
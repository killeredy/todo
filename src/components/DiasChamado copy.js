
export default function DiasChamados({ dia, data, calend, setCalendario , idDia, idSemana}) {
    const Horas = () => {
        return (
            <div className="h-100 bg-success" style={{ width: "15%", opacity: 0.7 , pointerEvents: 'none'}} ></div>
        )
    }


    const changeColor = (target) => {
        const idSemana =  target.getAttribute('id-semana')
        const idDia =  target.getAttribute('id-dia')
        console.log(target);
        setCalendario(idSemana, idDia);
    }

    
    let h = [];
    for (let i = 0; i < calend.horas; i++) {
        h.push(<Horas key={i}></Horas>);
    }

    return (
        <div style={{ width: "20%", color: 'white' }}>
            <h6 className="w-100 text-center">{dia > 30 ? (dia - 30) : dia}</h6>
            <div id-dia={idDia} id-semana={idSemana} className="border d-flex" style={{ height: '50px', backgroundColor: calend.ativo ? "transparent" :  "orange"}} onClick={(e) => changeColor(e.target)}>{h}</div>
            <h6 className="w-100 text-center">{data}</h6>
        </div>
    )

}
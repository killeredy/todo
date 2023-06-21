
export default function DiasChamados({ dia, data, calend, setCalendario}) {
    const Horas = () => {
        return (
            <div className="h-100 bg-success" style={{ width: "15%", opacity: 0.7 , pointerEvents: 'none'}} ></div>
        )
    }



    const styleWeek = {
        border: "solid 2px gray",
        backgroundColor: 'transparant',
        height: '50px'
    }

    const styleWeekSel ={
        border: "2px solid #fff",
        backgroundColor: 'orange',
        height: '50px'
    }

    const styleWeekend = {
        backgroundColor: 'transparant',
        height: '50px'
    }


    
    let h = [];
    for (let i = 0; i < calend.horas; i++) {
        h.push(<Horas key={i}></Horas>);
    }


    return (
        <div style={{ width: "5%", color: 'white' }}>
            <h6 className="w-100 text-center text-white">{calend.dia}</h6>
            <div id={dia} className="d-flex" style={calend.finalsemana? styleWeekend : (calend.ativo ? styleWeek :  styleWeekSel )  } onClick={(e) => setCalendario(e.target.id)}>{h}</div>
            {!calend.finalsemana && <h6 className="w-100 text-center">{calend.data}</h6>}

        </div>
    )

}
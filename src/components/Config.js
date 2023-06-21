export default function Config({dia, finalMes, setConfig}){




    return (
        <div className="d-flex text-white p-5">
            <div className="me-3">
                <label className="me-3">Dia Inicial</label>
                <input value={dia} type="text" onChange={(e)=>setConfig(e.target)} name="dia" />
            </div>
            <div >
                <label className="me-3">Ultimo dia mes</label>
                <input value={finalMes} type="text" onChange={(e)=>setConfig(e.target)} name="limiteMes" />
            </div>
        </div>
    )
}
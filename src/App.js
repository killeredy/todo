import './App.css';
import ChamadosList from './components/ChamadosList';
import ListGlobal from './components/ListGlobal';
import EditorChamado from './components/EditorChamado';
import { createContext, useContext, useEffect, useState } from 'react';
import CalendarioChamados from './components/CalendarioChamados';
import Config from './components/Config';


const AppContext = createContext({});

function App() {

  const [diaInicio, setDiaInicio] = useState(1);
  const [limitMes, setLimitMes] = useState(30);

  const list = ListGlobal();
  const vazio = {
    numero: 0,
    duracao: 0,
    descricao: ''
  }

  const ValidCalendario = [
    { finalsemana: false },
    { finalsemana: false },
    { finalsemana: false },
    { finalsemana: false },
    { finalsemana: false },
    { finalsemana: true },
    { finalsemana: true },
    { finalsemana: false },
    { finalsemana: false },
    { finalsemana: false },
    { finalsemana: false },
    { finalsemana: false },
    { finalsemana: true },
    { finalsemana: true },
    { finalsemana: false },
    { finalsemana: false },
    { finalsemana: false },
    { finalsemana: false },
    { finalsemana: false },
  ]

  const getTotalHoras = (chamados) => {
    let duracao = 0;
    for (let i = 0; i < chamados.length; i++) {
      duracao += chamados[i].duracao;
    }

    return duracao;
  }

  const calendarioInit = (jumpInActive, ValidCalendario) => {
    let duracao = totalHoras;
    let firstDay = parseInt( diaInicio );
    let limit =  parseInt( limitMes );
    console.log(firstDay, limit);


    let contDia = 1;
    let data = 0
    for (let i = 0; i < ValidCalendario.length; i++) {


      ValidCalendario[i].data = (data + firstDay);
      data++

      if (ValidCalendario[i].finalsemana) {
        continue;
      }

      if (jumpInActive && !ValidCalendario[i].ativo) {
        continue;
      }

      ValidCalendario[i].horas = duracao > 7 ? 7 : duracao
      duracao -=  7;
      duracao = duracao > 0 ? duracao : 0;


      ValidCalendario[i].dia = contDia;
      ValidCalendario[i].ativo = !ValidCalendario[i].finalsemana
      contDia++;



      if (data + firstDay > limit) {
        data = 0;
        firstDay = 1;
      }
    }

    return ValidCalendario;
  }

  const getHorasInativas = () => {
    let cont = 0;
    for (let i in calendario) {
      if (!calendario[i].ativo && !calendario[i].finalsemana) {
        cont++
      }
    }
    return cont * 7;
  }


  const [current, setCurrent] = useState(vazio);
  const [chamadosDb, setChamadosDb] = useState(list);
  const [totalHoras, setTotalHoras] = useState(getTotalHoras(chamadosDb));
  const [calendario, setCalendario] = useState(calendarioInit(false, ValidCalendario));
  const [horasInativas, sethorasInativas] = useState(getHorasInativas());



  const removeChamado = (value) => {
    setChamadosDb(chamadosDb.filter(chamadosDb => chamadosDb.numero !== value));
  }




  const addChamado = (newChamado) => {
    const listChamados = [...chamadosDb, newChamado];
    const duracao = getTotalHoras(listChamados);
    setTotalHoras(duracao);
    setChamadosDb(listChamados)
    let newCalendario = updateCalendario(calendario);
    setCalendario([...newCalendario])
  }


  const updateCalendario = (calendario) => {
    let newCalendario = calendarioInit(true, calendario);
    for (let i = 0; i < newCalendario.length; i++) {
      if (calendario[i].finalsemana)
        continue

      let ativo = calendario[i].ativo;
      newCalendario[i].ativo = ativo

      if (!ativo) {
        newCalendario[i].horas = 0;
        i++
      }
    }
    return newCalendario;
  }

  const setCurrentdb = (value) => {
    const myCurrent = chamadosDb.filter(chamadosDb => chamadosDb.numero === value)[0];
    setCurrent(myCurrent);
  }

  const handleCalendario = (id) => {
    id = parseInt(id);
    var newCalendario = [...calendario];
    newCalendario[id].ativo = !newCalendario[id].ativo;
    setCalendario(updateCalendario(newCalendario, true, newCalendario))
    sethorasInativas(getHorasInativas());
  }

  const handleConfigData = (target) => {
    if (target.name === 'dia') {
      setDiaInicio( target.value ) ;
    } else  {
      setLimitMes(target.value )
    }

    setCalendario( updateCalendario(calendario) );
  }


  return (
    <AppContext.Provider value={{}} >
      <div className="container bg-dark rounded p-0 ">
        <Config dia={diaInicio} finalMes={limitMes} setConfig={handleConfigData} />
        <CalendarioChamados chamados={calendario} setCalendario={handleCalendario} totalHoras={totalHoras} horasInativas={horasInativas} />
        <EditorChamado chamado={current} addChamado={addChamado} />
        <ChamadosList list={chamadosDb} actionChamados={removeChamado} setCurrent={setCurrentdb} />

      </div>
    </AppContext.Provider>
  );
}

export default App;

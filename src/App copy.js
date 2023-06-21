import './App.css';
import ChamadosList from './components/ChamadosList';
import ListGlobal from './components/ListGlobal';
import EditorChamado from './components/EditorChamado';
import { createContext, useContext, useEffect, useState } from 'react';
import CalendarioChamados from './components/CalendarioChamados';


const AppContext = createContext({});

function App() {

  const list = ListGlobal();
  const vazio = {
    numero: 0,
    duracao: 0,
    descricao: ''
  }

  const calendarioInit = (chamados) => {
    const ValidCalendario = [
      {
        dias: [
          { horas: 0 },
          { horas: 0 },
          { horas: 0 },
          { horas: 0 },
          { horas: 0 },
        ]
      },
      {
        dias: [
          { horas: 0 },
          { horas: 0 },
          { horas: 0 },
          { horas: 0 },
          { horas: 0 },
        ]
      },
      {
        dias: [
          { horas: 0 },
          { horas: 0 },
          { horas: 0 },
          { horas: 0 },
          { horas: 0 },
        ]
      }
    ]

    let duracao = 0;
    for (let i = 0; i < chamados.length; i++) {
      duracao += chamados[i].duracao;
    }

    let horasSemanais = 35;
    let horasDiarias = 7;

    let newCalendario = [];
    for (let i = 0; i < ValidCalendario.length; i++) {
      let durSemana = (duracao) - horasSemanais * i;
      durSemana = (durSemana < 0) ? 0 : durSemana;
      newCalendario[i] = { dias: [] }

      let calendarioSemana = ValidCalendario[i].dias;
      for (let j = 0; j < calendarioSemana.length; j++) {
        let durDia = durSemana - horasDiarias * j;
        durDia = (durDia < 0) ? 0 : durDia;
        durDia = (durDia > 7) ? 7 : durDia;

        newCalendario[i]['dias'][j] = {
          horas: durDia,
          ativo: true
        };

      }
    }
    return newCalendario;
  }

  const [current, setCurrent] = useState(vazio);
  const [chamadosDb, setChamadosDb] = useState(list);
  const removeChamado = (value) => {
    setChamadosDb(chamadosDb.filter(chamadosDb => chamadosDb.numero !== value));
  }


  const test = calendarioInit(chamadosDb);

  const [calendario, setCalendario] = useState([...test]);

  const addChamado = (newChamado) => {
    const t = [...chamadosDb, newChamado];
    setChamadosDb(t)
    let newCalendario = updateCalendario(calendario);
    setCalendario([...newCalendario])
  }




  const updateCalendario = (calendario) => {
    let newCalendario = calendarioInit(chamadosDb);
    for (let i = 0; i < newCalendario.length; i++) {
      let dias = newCalendario[i].dias;
      for (let j = 0; j < dias.length; j++) {
        let ativo = calendario[i]['dias'][j].ativo;
        let horas = newCalendario[i]['dias'][j].horas;

        newCalendario[i]['dias'][j].ativo = ativo;


        if (!ativo && horas > 0) {
          newCalendario[i]['dias'][j].horas = 0;
          // j++;
          newCalendario[i]['dias'][j + 1].horas = horas;
          // newCalendario[i]['dias'][j].ativo = ativo;
        }

      }
      return newCalendario;
    }
  }

  const setCurrentdb = (value) => {
    const myCurrent = chamadosDb.filter(chamadosDb => chamadosDb.numero === value)[0];
    setCurrent(myCurrent);
  }

  const handleCalendario = (newCalendario) => {
    let calend = updateCalendario(newCalendario);
    setCalendario([...calend])
  }

  // useEffect(() =>{
  //   setCalendario( calendarioInit(chamadosDb) )
  // }, [])

  return (
    <AppContext.Provider value={{}} >
      <div className="container bg-dark rounded p-0 ">
        <CalendarioChamados chamados={calendario} setCalendario={handleCalendario} />
        <ChamadosList list={chamadosDb} actionChamados={removeChamado} setCurrent={setCurrentdb} />
        <EditorChamado chamado={current} addChamado={addChamado} />

      </div>
    </AppContext.Provider>
  );
}

export default App;

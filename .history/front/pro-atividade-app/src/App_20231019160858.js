import {useEffect, useState} from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade';

function App() {
  const [index] = useState(0)
  const [atividades, setAtividades] = useState([])
  const [atividade, setAtividade] = useState({id:0})

  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  }

  useEffect(() => {
    //atividades.length <= 0 ? setIndex(1) :
    //setIndex(Math.max.apply( Math, atividades.map((item) => item.id)) + 1) 
    //const getAtividades = async () => {
      //const todasAtividades = await pegaTodasAtividades()
      if (todasAtividades) setAtividades(todasAtividades)
    }
    getAtividades();
  },[atividades])

  function addAtividade(ativ) {
    setAtividades([ ...atividades, { ...ativ, id: index}])
  }

  function cancelarAtividade() {
    setAtividade({id: 0})
  }

  function atualizarAtividade(ativ) {
    setAtividades(atividades.map(item => item.id === ativ.id ? ativ : item ))
    setAtividade({id: 0})

  }

  function deletarAtividade(id) {
    const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id)
    setAtividades([...atividadesFiltradas])
  }
  
  function pegarAtividade(id) {
    const atividade = atividades.filter(atividade => atividade.id === id)
    setAtividade(atividade[0])
  }

  return (
    <>
      <AtividadeForm
        addAtividade={addAtividade}
        cancelarAtividade={cancelarAtividade}
        atualizarAtividade={atualizarAtividade}
        ativSelecionada={atividade}
        atividades={atividades}
      />
      
      <AtividadeLista
        atividades={atividades}
        deletarAtividade={deletarAtividade}
        pegarAtividade={pegarAtividade}
      />

    </>
      
  );
}

export default App;

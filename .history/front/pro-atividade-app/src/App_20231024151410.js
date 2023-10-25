import {useEffect, useState} from 'react';
import './App.css';
import { Button, Modal } from 'react-bootstrap';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade';

function App() {
  const [show, setShow] = useState(false);
  const [atividades, setAtividades] = useState([])
  const [atividade, setAtividade] = useState({id:0})
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  }

  useEffect(() => {
    //atividades.length <= 0 ? setIndex(1) :
    //setIndex(Math.max.apply( Math, atividades.map((item) => item.id)) + 1) 
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades()
      if (todasAtividades) setAtividades(todasAtividades)
    }
    getAtividades();
  },[])

   const addAtividade = async (ativ) => {
    const response = await api.post('atividade', ativ)
    console.log(response.data)
    setAtividades([ ...atividades, response.data])
  }

  function cancelarAtividade() {
    setAtividade({id: 0})
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ) 
    const {id} = response.data
    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item ))
    )
    setAtividade({id: 0})
  }

  const deletarAtividade = async (id) => {
    if (await api.delete(`atividade/${id}`))
    {
      const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id)
          setAtividades([...atividadesFiltradas])
    }
  }
  
  function pegarAtividade(id) {
    const atividade = atividades.filter(atividade => atividade.id === id)
    setAtividade(atividade[0])
  }

  return (
    <>
      <div></div>
      <h1>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
      <AtividadeLista
        atividades={atividades}
        deletarAtividade={deletarAtividade}
        pegarAtividade={pegarAtividade}
      />

      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            addAtividade={addAtividade}
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            ativSelecionada={atividade}
            atividades={atividades}
          />
        </Modal.Body>
      </Modal>  

    </>
      
  );
}

export default App;

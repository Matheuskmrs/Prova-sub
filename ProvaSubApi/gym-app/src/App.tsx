import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastrarAluno from './pages/aluno/cadastrar';
import CadastrarIMC from './pages/imc/cadastrar';
import ListarIMCs from './pages/imc/listar';
import ListarIMCsPorAluno from './pages/imc/listarporaluno';
import AlterarIMC from './pages/imc/alterar';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/pages/aluno/cadastrar" element={<CadastrarAluno />} />
                <Route path="/pages/imc/cadastrar" element={<CadastrarIMC />} />
                <Route path="/pages/imc/listar" element={<ListarIMCs />} />
                <Route path="/pages/imc/listarporaluno" element={<ListarIMCsPorAluno />} />
                <Route path="/pages/imc/alterar" element={<AlterarIMC />} />
            </Routes>
        </Router>
    );
};

export default App;

import React, { useState } from 'react';
import axios from 'axios';

const CadastrarAluno: React.FC = () => {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const aluno = { nome, dataNascimento };
        try {
            await axios.post('http://localhost:5000/api/aluno', aluno);
            alert('Aluno cadastrado com sucesso!');
        } catch (error) {
            alert('Erro ao cadastrar aluno: ' + error.response.data);
        }
    };

    return (
        <div>
            <h1>Cadastrar Aluno</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
                </div>
                <div>
                    <label>Data de Nascimento:</label>
                    <input type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastrarAluno;

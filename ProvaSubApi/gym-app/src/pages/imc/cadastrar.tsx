import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastrarIMC: React.FC = () => {
    const [alunos, setAlunos] = useState([]);
    const [alunoId, setAlunoId] = useState(0);
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');

    useEffect(() => {
        const fetchAlunos = async () => {
            const response = await axios.get('http://localhost:5000/api/aluno');
            setAlunos(response.data);
        };
        fetchAlunos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const imc = { alunoId, altura: parseFloat(altura), peso: parseFloat(peso) };
        try {
            await axios.post('http://localhost:5000/api/imc', imc);
            alert('IMC cadastrado com sucesso!');
        } catch (error) {
            alert('Erro ao cadastrar IMC: ' + error.response.data);
        }
    };

    return (
        <div>
            <h1>Cadastrar IMC</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Aluno:</label>
                    <select value={alunoId} onChange={e => setAlunoId(Number(e.target.value))}>
                        <option value={0}>Selecione um aluno</option>
                        {alunos.map((aluno: any) => (
                            <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Altura (metros):</label>
                    <input type="text" value={altura} onChange={e => setAltura(e.target.value)} />
                </div>
                <div>
                    <label>Peso (quilos):</label>
                    <input type="text" value={peso} onChange={e => setPeso(e.target.value)} />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastrarIMC;

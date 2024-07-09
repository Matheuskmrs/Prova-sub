import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarIMCsPorAluno: React.FC = () => {
    const [alunoId, setAlunoId] = useState(0);
    const [imcs, setIMCs] = useState([]);

    const handleAlunoIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAlunoId(parseInt(e.target.value, 10));
    };

    useEffect(() => {
        const fetchIMCs = async () => {
            if (alunoId !== 0) {
                const response = await axios.get(`http://localhost:5000/api/imc/por-aluno/${alunoId}`);
                setIMCs(response.data);
            }
        };
        fetchIMCs();
    }, [alunoId]);

    return (
        <div>
            <h1>Listar IMCs por Aluno</h1>
            <div>
                <label>Aluno:</label>
                <select value={alunoId} onChange={handleAlunoIdChange}>
                    <option value={0}>Selecione um aluno</option>
                   
                </select>
            </div>
            {alunoId !== 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Altura</th>
                            <th>Peso</th>
                            <th>IMC</th>
                            <th>Classificação</th>
                            <th>Data de Criação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {imcs.map((imc: any) => (
                            <tr key={imc.id}>
                                <td>{imc.id}</td>
                                <td>{imc.altura}</td>
                                <td>{imc.peso}</td>
                                <td>{imc.valorIMC}</td>
                                <td>{imc.classificacao}</td>
                                <td>{new Date(imc.dataMedicao).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListarIMCsPorAluno;
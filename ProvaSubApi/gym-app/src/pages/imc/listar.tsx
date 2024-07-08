import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarIMCs: React.FC = () => {
    const [imcs, setIMCs] = useState([]);

    useEffect(() => {
        const fetchIMCs = async () => {
            const response = await axios.get('http://localhost:5000/api/imc');
            setIMCs(response.data);
        };
        fetchIMCs();
    }, []);

    return (
        <div>
            <h1>Listar IMCs</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do Aluno</th>
                        <th>Data de Nascimento</th>
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
                            <td>{imc.aluno.nome}</td>
                            <td>{new Date(imc.aluno.dataNascimento).toLocaleDateString()}</td>
                            <td>{imc.altura}</td>
                            <td>{imc.peso}</td>
                            <td>{imc.valorIMC}</td>
                            <td>{imc.classificacao}</td>
                            <td>{new Date(imc.dataMedicao).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListarIMCs;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlterarIMC: React.FC = () => {
    const [id, setId] = useState<number | null>(null);
    const [imc, setIMC] = useState({
        alunoId: 0,
        altura: '',
        peso: '',
        valorIMC: 0,
        classificacao: '',
        dataMedicao: ''
    });

    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(parseInt(e.target.value, 10));
    };

    const fetchIMC = async () => {
        if (id !== null) {
            const response = await axios.get(`http://localhost:5000/api/imc/${id}`);
            setIMC(response.data);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/imc/${id}`, imc);
            alert('IMC atualizado com sucesso!');
        } catch (error) {
            alert('Erro ao atualizar IMC: ' + error.response.data);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIMC({ ...imc, [name]: value });
    };

    useEffect(() => {
        if (id !== null) {
            fetchIMC();
        }
    }, [id]);

    return (
        <div>
            <h1>Alterar IMC</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID do IMC:</label>
                    <input type="number" onChange={handleIdChange} />
                    <button type="button" onClick={fetchIMC}>Buscar IMC</button>
                </div>
                {id !== null && (
                    <>
                        <div>
                            <label>Altura (metros):</label>
                            <input type="text" name="altura" value={imc.altura} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Peso (quilos):</label>
                            <input type="text" name="peso" value={imc.peso} onChange={handleChange} />
                        </div>
                        <button type="submit">Atualizar</button>
                    </>
                )}
            </form>
        </div>
    );
};

export default AlterarIMC;


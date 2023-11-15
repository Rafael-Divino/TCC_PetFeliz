import { useState } from 'react';
import './Doe.css';
import axios from 'axios';
import img from '../../Components/img/propaganda.png'
// import DateTimePicker from 'react-datetime-picker';
// import Datetime from 'react-datetime';

const Doe = () => {



    const [Nome_Animal, setNomeAnimal] = useState("");
    const [Nome_Pet, setNome_Pet] = useState("");
    const [Porte_Pet, setPorte_Pet] = useState("");
    const [Sexo_Pet, setSexo_Pet] = useState("");
    const [Idade_Pet, setIdade_Pet] = useState("");
    const [Descricao_Pet, setDescricao_Pet] = useState("");
    const [Status_Pet, setStatus_Pet] = useState("");
    const [Castrado, setCastrado] = useState("");
    const [Nome_Foto, setNome_Foto] = useState("");
    const [Foto_Pet] = useState("");
    const [Base64, setBase64] = useState(null);

    const [Especie, setEspecie] = useState({
        Nome_Especie: '',
    })

    const [Raca, setRaca] = useState({
        Nome_Raca: '',
    });



    const [Vacina, setVacina] = useState({
        data_vacina: '',
        status: 'Selecione a Opção',
        descricao: '',
    });


    const [errors, setErrors] = useState({});

    const nome_Animal = ['Gato', 'Cão'];
    const idade_Pet = ['Entre 0 e 1', 'Entre 1 e 4', 'Entre 4 e 10', 'Mais de 10'];
    const porte_Pet = ['Anão', 'Pequeno Porte', 'Médio Porte', 'Grande Porte', 'Molosso'];
    const sexo_Pet = ['Macho', 'Fêmea'];
    const castrado = ['Sim', 'Não'];
    const status_Pet = ['Disponível'];
    const status = ['Valido', 'Vencido'];

    const validateForm = async () => {
        return {};
    };


    function handleFileChange(event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const base64 = e.target.result.split(',')[1];
                setBase64(base64);

            };
            reader.readAsDataURL(selectedFile);
        } else {
            setBase64(null);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = await validateForm();
        setErrors(validationErrors);

        if (Base64) {

            const body = {
                Vacina, Raca, Especie, nome_Animal, Nome_Pet, Porte_Pet, Sexo_Pet, Idade_Pet, Descricao_Pet, Status_Pet, Castrado, Nome_Foto, Foto_Pet, Base64
            }

            if (Object.keys(validationErrors).length === 0) {
                try {
                    const response = await axios.post('https://petfeliz.azurewebsites.net/api/PetFeliz/CadastrarPet', body);

                    if (response.status === 200) {
                        alert('Cadastro realizado com sucesso');
                    }
                } catch (error) {
                    console.error('Erro ao fazer a solicitação', error);
                    alert('Erro ao fazer a solicitação');
                }
            }
        }
    }

    return (
        <div className='doe-content'>

            <div className='doe'>

                <div className='textos'>
                    <div className='txt'><h2>  Tenha consciência,
                        adicione informações verídicas sobre
                        você e o pet que gostaria de doar.</h2></div>
                    <div className='txt'><h2>    Informe seu e-mail e contatos corretamente, isso ajudará uma família a adotar
                        um pet mais facilmente.</h2></div>
                    <div className='txt'><h2>    Se você quer mudar o mundo,
                        comece adotando um animal. Eles podem trazer grandes mudanças para nossas vidas, </h2></div>
                </div>

                <div className='imagem'>
                    <img src={img} alt="propaganda" />
                </div>
                <div className="container-doe">
                    <h1 className="title">CADASTRO ANIMAL</h1>

                    <input
                        type="text"
                        placeholder="Digite o Nome do Animal"
                        className="texto"
                        onChange={(e) => setNome_Pet(e.target.value)}
                        value={Nome_Pet}
                    />
                    {errors.Nome_Pet && <p className="labelError">{errors.Nome_Pet}</p>}

                    <input
                        type="text"
                        placeholder="Digite a Especie do Animal"
                        className="texto"
                        onChange={(e) => setEspecie({ ...Especie, Nome_Especie: e.target.value })}
                        value={Especie.Nome_Especie}
                    />
                    {errors.Nome_Pet && <p className="labelError">{errors.Nome_Pet}</p>}

                    <input
                        type="text"
                        placeholder="Digite a Raça do Animal"
                        className="texto"
                        onChange={(e) => setRaca({ ...Raca, Nome_Raca: e.target.value })}
                        value={Raca.Nome_Raca}
                    />
                    {errors.Nome_Raca && <p className="labelError">{errors.Nome_Raca}</p>}

                    {/* <input
                type="text"
                placeholder="Tipo"
                className="input"
                onChange={(e) => setAnimal({ ...Animal, Nome_Animal: e.target.value })}
                value={Animal.Nome_Animal}
            />
            {errors.Nome_Animal && <p className="labelError">{errors.Nome_Animal}</p>} */}

                    <select
                        value={Nome_Animal}
                        onChange={(e) => setNomeAnimal(e.target.value)}
                        className="dropdown"
                    >
                        <option value="Selecione o tipo">Selecione o Tipo do Animal</option>
                        {nome_Animal.map((option) => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        ))}
                    </select>



                    <select
                        value={Idade_Pet}
                        onChange={(e) => setIdade_Pet(e.target.value)}
                        className="dropdown"
                    >
                        <option value="Selecione a Idade">Selecione a Idade do Animal</option>
                        {idade_Pet.map((option) => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={Porte_Pet}
                        onChange={(e) => setPorte_Pet(e.target.value)}
                        className="dropdown"
                    >
                        <option value="Selecione o Porte">Selecione o Porte do Animal</option>
                        {porte_Pet.map((option) => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={Castrado}
                        onChange={(e) => setCastrado(e.target.value)}
                        className="dropdown"
                    >
                        <option value="Selecione a opção">Selecione se o Animal foi Castrado</option>
                        {castrado.map((option) => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={Sexo_Pet}
                        onChange={(e) => setSexo_Pet(e.target.value)}
                        className="dropdown"
                    >
                        <option value="Selecione o Sexo">Selecione o Sexo do Animal</option>
                        {sexo_Pet.map((option) => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={Status_Pet}
                        onChange={(e) => setStatus_Pet(e.target.value)}
                        className="dropdown"
                    >
                        <option value="Selecione uma opção">Selecione o Status</option>
                        {status_Pet.map((option) => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        ))}
                    </select>



                    <input
                        onChange={(e) => setVacina({ ...Vacina, data_vacina: e.target.value })}
                        value={Vacina.data_vacina}
                        type="date"
                        className="dropdown"
                        placeholder='Data Vacina'
                    >

                    </input>


                    <input
                        type="text"
                        placeholder="Tipo da vacinas"
                        className="texto"
                        onChange={(e) => setVacina({ ...Vacina, descricao: e.target.value })}
                        value={Vacina.descricao}
                    />
                    <select
                        value={Vacina.status}
                        onChange={(e) => setVacina({ ...Vacina, status: e.target.value })}
                        className="dropdown"
                    >
                        <option value="Selecione uma opção">Selecione a Validade da Vacina</option>
                        {status.map((option) => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Descrição"
                        className="texto"
                        onChange={(e) => setDescricao_Pet(e.target.value)}
                        value={Descricao_Pet}
                    />

                    <form onSubmit={handleSubmit}>
                        <button value={Nome_Foto} onChange={(e) => setNome_Foto(e.target.value)} />

                        <input type="file" accept="image/jpeg" onChange={handleFileChange} />
                        
                        <button type="submit" className="cadastrar">
                            CADASTRAR
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Doe;
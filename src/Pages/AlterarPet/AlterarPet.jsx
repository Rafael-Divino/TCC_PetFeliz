import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AlterarPet.css';
import { AuthContextFunctions } from '../../AuthContext';


const AlterarPet = () => {
  const [Porte_Pet, setPorte_Pet] = useState("");
  const [Sexo_Pet, setSexo_Pet] = useState("");
  const [Idade_Pet, setIdade_Pet] = useState("");
  const [Descricao_Pet, setDescricao_Pet] = useState("");
  const [Status_Pet, setStatus_Pet] = useState("");
  const [Castrado, setCastrado] = useState("");
  const [Foto_Pet] = useState("");
  const [Base64, setBase64] = useState(null);
  const [Cod_Usuario, setCod_Usuario] = useState("");
  const [Nome_Foto] = useState("");
  const [Nome_Pet, setNome_Pet] = useState("")
  
  const [Especie, setEspecie] = useState({
    Nome_Especie: '',
  });

  const [Raca, setRaca] = useState({
    Nome_Raca: '',
  });

  const [Animal, setAnimal] = useState({
    Nome_Animal: '',
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
  const status_Pet = ['Disponível', "Interessados", 'Adotado'];
  const status = ['sim', 'não'];

  const validateForm = () => {
    const errors = {};
    // ... (your validation logic)
    return errors;
  };

  useEffect(() => {
    const usuarioLogado = AuthContextFunctions.CheckUserLogin();

    if (usuarioLogado) {
        const userData = JSON.parse(AuthContextFunctions.GetUserData());
        const userId = userData.Cod_Usuario;
        setCod_Usuario(userId);
    } else {
        alert("nenhum usuario logado")
    }
  }, []);

  const handleDateChange = (date) => {
    setVacina({ ...Vacina, data_vacina: date });
  };

  const handleFileChange = (event) => {
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
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = await validateForm();
    setErrors(validationErrors);

    if (Base64) {
      const sexo = Sexo_Pet === 'Macho' ? 'M' : 'F';

      const body = {
        Vacina, Animal, Nome_Pet, Raca, Especie, Porte_Pet, Sexo_Pet: sexo, Idade_Pet, Descricao_Pet, Status_Pet, Castrado, Nome_Foto, Foto_Pet, Base64, Cod_Usuario
      };

      if (!AuthContextFunctions.CheckUserLogin()) {
        console.log('Usuário não logado. Redirecionando para a página de login.');
        return;
      }

      const token = AuthContextFunctions.GenerateHeader().get('Authorization');

      try {
        const response = await axios.put(
          'https://petfeliz.azurewebsites.net/api/PetFeliz/AtualizarPet',
          body,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          navigate('/Home');
        }
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
        alert('erro');
      }
    }
  };

  return (
    <div className='alterarpet'>
      <div className='alterarpet-body'>
        <div className='title-alterarpet'>
          <p>EDITAR PERFIL PET</p>
        </div>
        <form className='alterarpet-form'>
          <input
            type="text"
            placeholder="Digite o Nome do Animal"
            className="input"
            onChange={(e) => setNome_Pet(e.target.value)}
            value={Nome_Pet}
          />
          {errors.Nome_Pet && <p className="labelError">{errors.Nome_Pet}</p>} 

          <input
            type="text"
            placeholder="Digite a Especie do Animal"
            className="input"
            onChange={(e) => setEspecie({ ...Especie, Nome_Especie: e.target.value })}
            value={Especie.Nome_Especie}
          />
          {errors.Nome_Especie && <p className="labelError">{errors.Nome_Especie}</p>}

          <input
            type="text"
            placeholder="Digite a Raça do Animal"
            className="input"
            onChange={(e) => setRaca({ ...Raca, Nome_Raca: e.target.value })}
            value={Raca.Nome_Raca}
          />
          {errors.Nome_Raca && <p className="labelError">{errors.Nome_Raca}</p>}


                    <select
                        value={Animal.Nome_Animal}
                        onChange={(e) => setAnimal({ ...Animal, Nome_Animal: e.target.value })}
                        className="dropdown"
                    >
                        <option value="Selecione o tipo">Edite o Tipo do Animal</option>
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
                        <option value="Selecione a Idade">Edite a Idade do Animal</option>
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
                        <option value="Selecione o Porte">Edite o Porte do Animal</option>
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
                        <option value="Selecione a opção">Edite se Animal foi Castrado</option>
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
                        <option value="Selecione o Sexo">Edite o Sexo do Animal</option>
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
                        <option value="Selecione uma opção">Edite o Status do Animal</option>
                        {status_Pet.map((option) => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Tipo da vacinas"
                        className="input"
                        onChange={(e) => setVacina({ ...Vacina, descricao: e.target.value })}
                        value={Vacina.descricao}
                    />
                    <select
                        value={Vacina.status}
                        onChange={(e) => setVacina({ ...Vacina, status: e.target.value })}
                        className="dropdown"
                    >
                        <option value="Selecione uma opção">Edite se o animal está vacinado</option>
                        {status.map((option) => (
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
                        placeholder="Descrição"
                        className="input"
                        onChange={(e) => setDescricao_Pet(e.target.value)}
                        value={Descricao_Pet}
                    />

                    <form onSubmit={handleSubmit}>
                        <input type="input" value={Nome_Foto} onChange={(e) => setNome_Foto(e.target.value)} />

                        <input type="file" accept="image/jpeg" onChange={handleFileChange} />

                        <button type="submit" className="cadastrar">
                            SALVAR ALTERAÇÕES
                        </button>
        </form>
      </form>
      </div>
  </div>
  );
};

export default AlterarPet;

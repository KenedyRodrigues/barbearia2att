import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import axios from "axios";
import { useRoute, useFocusEffect  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Perfil({ navigation }) {
  const route = useRoute();
  //const { selectedTime } = route.params || {};
  //const { selectedDate } = route.params || {};
  //const { nome } = route.params || {};
  //const { telefone } = route.params || {};

  const { selectedTime: initialTime, selectedDate: initialDate, nome, telefone } = route.params || {};

  const api = axios.create({
    baseURL: 'http://192.168.15.143:5000', // URL do seu backend
    headers: {
        'Authorization': 'Bearer seu_token_aqui', // Se necessário, insira o token de autenticação
        'Content-Type': 'application/json' // Tipo de conteúdo da requisição
    }
});
  
  // Usando useState para armazenar a data e a hora
  const [selectedDate, setSelectedDate] = useState(initialDate || ''); 
  const [selectedTime, setSelectedTime] = useState(initialTime || ''); 
  const [nomeCer, setNomeCer] = useState(nome); // Estado para o nome
  const [telefoneCer, setTelefoneCer] = useState(telefone);

  
  const formatDate = (date) => {
    const d = new Date(date); // Cria um objeto Date a partir da string
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset()); // Ajusta para evitar problemas de fuso horário
    const day = String(d.getDate()).padStart(2, '0'); // Obtém o dia com 2 dígitos
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Obtém o mês com 2 dígitos
    return `${day}/${month}`; // Retorna a data no formato DD/MM
  };

  const selectedDateFormatted = formatDate(selectedDate);

  console.log('nomecer', nomeCer)
  console.log('telefonecer:', telefoneCer)

  const [barbeiroSelecionado1, setBarbeiroSelecionado1] = useState(null);
  const [mostrarListaBarbeiros, setMostrarListaBarbeiros] = useState(false);
  const [servicosSelecionados1, setServicosSelecionados1] = useState([]);
  const [mostrarListaServicos, setMostrarListaServicos] = useState(false);



  const barbeiros = [
    { id: '1', nome: 'Roney' },
    { id: '2', nome: 'Bruno' },
    { id: '3', nome: 'Tony' }
  ];

  const servicos = [
    { id: '1', nome: 'Cabelo' },
    { id: '2', nome: 'Barba' },
    { id: '3', nome: 'Pezinho' },
    { id: '4', nome: 'Sobrancelha' },
  ];

  const escolherBarbeiro = (barbeiro) => {
    setBarbeiroSelecionado1(barbeiro);
    setMostrarListaBarbeiros(false);
    salvarDados();
  };

  const toggleServico = (id) => {
    setServicosSelecionados1((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id); // Remove o serviço se já estiver selecionado
      } else {
        return [...prev, id]; // Adiciona o serviço se não estiver selecionado
      }
    });
    //setServicosSelecionados((prev) => 
      //prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    //);
    //salvarDados();
  };

  const renderServico = ({ item }) => {
    const isSelected = servicosSelecionados1.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.barbeiroItem, isSelected && styles.selectedOption]}
        onPress={() => toggleServico(item.id)}
      >
        <Text style={styles.textBarbeiro}>{item.nome}</Text>
      </TouchableOpacity>
    );
  };

  const carregarDados = async () => {
    try {
      const nomeSalvo = await AsyncStorage.getItem('nome');
      const telefoneSalvo = await AsyncStorage.getItem('telefone');
      const barbeiroSalvo = await AsyncStorage.getItem('barbeiro');
      const servicosSalvos = await AsyncStorage.getItem('servicos');
      //const dateSalvo = await AsyncStorage.getItem('selectedDateFormatted');
      //const timeSalvo = await AsyncStorage.getItem('selectedTime');

      // Atualiza os estados apenas se os dados foram carregados corretamente
      if (nomeSalvo) setNomeCer(nomeSalvo);
      if (telefoneSalvo) setTelefoneCer(telefoneSalvo);
      if (barbeiroSalvo) setBarbeiroSelecionado1(JSON.parse(barbeiroSalvo));
      if (servicosSalvos) setServicosSelecionados1(JSON.parse(servicosSalvos));
      //if (dateSalvo) selectedDateFormatted(dateSalvo); // Atualiza o estado selectedDate
      //if (timeSalvo) setSelectedTime(timeSalvo); // Atualiza o estado selectedTime
    } catch (e) {
      console.error('Erro ao carregar dados do AsyncStorage', e);
    }
  };
  
  const salvarDados = async () => {
    try {
      // Verifica se cada valor é válido antes de salvar
      if (nomeCer && nomeCer.trim() !== '') {
        await AsyncStorage.setItem('nome', nomeCer);
      }
      if (telefoneCer && telefoneCer.trim() !== '') {
        await AsyncStorage.setItem('telefone', telefoneCer);
      }
      await AsyncStorage.setItem('barbeiro', JSON.stringify(barbeiroSelecionado1) || '{}');
      await AsyncStorage.setItem('servicos', JSON.stringify(servicosSelecionados1) || '[]');
      console.log("Dados salvos:", { nomeCer, telefoneCer, barbeiroSelecionado1, servicosSelecionados1 });
    } catch (e) {
      console.error('Erro ao salvar dados no AsyncStorage', e);
    }
  };


  

  // Função para carregar os dados do AsyncStorage


  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );
  useEffect(() => {
    if (nomeCer && telefoneCer && barbeiroSelecionado1 !== null && servicosSelecionados1.length > 0) {
      salvarDados();
    }
  }, [nomeCer, telefoneCer, barbeiroSelecionado1, servicosSelecionados1]);

  const agendar = async (nomeCer, telefoneCer, barbeiroSelecionado, servicosSelecionados, selectedDate, selectedTime) => {
    try {
      if (!nomeCer || !telefoneCer || !barbeiroSelecionado || !servicosSelecionados || !selectedDate || !selectedTime) {
        alert('Todos os campos devem ser preenchidos.');
        return;
      }
  
      const response = await fetch('http://192.168.15.143:5000/api/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeCer,
          telefoneCer,
          barbeiroSelecionado,
          servicosSelecionados,
          selectedDate,
          selectedTime,
        }),
      });
  
      const contentType = response.headers.get("content-type");
  
      // Verificar se a resposta é JSON antes de tentar parseá-la
      if (contentType && contentType.includes("application/json")) {
        const responseData = await response.json();
  
        if (response.ok) {
          console.log('Agendamento feito com sucesso:', responseData);
          alert('Agendamento realizado com sucesso!');
        } else {
          console.error('Erro ao agendar:', responseData);
          alert(`Erro ao agendar: ${responseData.message || 'Erro desconhecido'}`);
        }
      } else {
        // Caso a resposta não seja JSON, exibe uma mensagem de erro
        console.error('Resposta inesperada da API:', response);
        alert('Erro inesperado ao comunicar com o servidor.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      alert('Erro de conexão com o servidor. Verifique a conexão e tente novamente.');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.containerItems}>
        <Text style={styles.textPrincipal}>Novo Agendamento</Text>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>



      <View style={styles.containerConteudo}>


      <Text style={styles.textSecundario}>Dia e hora</Text>
        <TouchableOpacity 
        style={styles.buttonEscolher}
        onPress={() =>
          navigation.navigate('Agendamento', {
            nome: nomeCer, 
            telefone: telefoneCer,
            barbeiro: barbeiroSelecionado1, 
            servicos: servicosSelecionados1,
            //selectedDateFormatted: selectedDateFormatted,
            //selectedTime: selectedTime,
            
          })
        }
        >
          <Text style={styles.textButton}>
          {selectedDateFormatted && selectedTime 
              ? `Selecionado: ${selectedDateFormatted} ${selectedTime}` 
              : 'Selecionar data'}
          </Text>
        </TouchableOpacity>
        
        




        <Text style={styles.textSecundario}>Serviço</Text>
        <TouchableOpacity
        style={styles.buttonEscolher}
        onPress={() => setMostrarListaServicos(true)} // Abre o modal de serviços
        >
        <Text style={styles.textButton}>
        {servicosSelecionados1.length > 0 ? 
            `Selecionado(s): ${servicos
            .filter(servico => servicosSelecionados1.includes(servico.id))
            .map(servico => servico.nome)
            .join(', ')}` : 
            'Selecionar serviço'}
        </Text>
        </TouchableOpacity>

        {/* Modal para exibir a lista de serviços */}
        <Modal
          visible={mostrarListaServicos}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setMostrarListaServicos(false)} // Fecha o modal ao apertar o botão de voltar
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={servicos}
                keyExtractor={(item) => item.id}
                renderItem={renderServico}
              />
              <TouchableOpacity
                style={styles.buttonFecharModal}
                onPress={() => setMostrarListaServicos(false)} // Fecha o modal ao clicar
              >
                <Text style={styles.textButtonFechar}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        
        <Text style={styles.textSecundario}>Barbeiro</Text>
        <TouchableOpacity
          style={styles.buttonEscolher}
          onPress={() => setMostrarListaBarbeiros(true)} // Abre o modal de barbeiros
        >
          <Text style={styles.textButton}>
            {barbeiroSelecionado1 ? barbeiroSelecionado1.nome : 'Selecionar barbeiro'}
          </Text>
        </TouchableOpacity>

        {/* Modal para exibir a lista de barbeiros */}
        <Modal
          visible={mostrarListaBarbeiros}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setMostrarListaBarbeiros(false)} // Fecha o modal ao apertar o botão de voltar
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={barbeiros}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.barbeiroItem}
                    onPress={() => escolherBarbeiro(item)}
                  >
                    <Text style={styles.textBarbeiro}>{item.nome}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.buttonFecharModal}
                onPress={() => setMostrarListaBarbeiros(false)} // Fecha o modal ao clicar
              >
                <Text style={styles.textButtonFechar}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>



        
      </View>
      

      <TouchableOpacity 
      
      style={styles.button}

      onPress={() => 

        agendar(nomeCer, telefoneCer, barbeiroSelecionado1, servicosSelecionados1, selectedDate, selectedTime)

      }
      
      >
        <Text style={styles.textButtonConfirmar}>Confirmar Agendamento</Text>
      </TouchableOpacity>
    </View>
    
  );
  
}
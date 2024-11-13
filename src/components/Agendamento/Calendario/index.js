import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import * as CalendarAPI from 'expo-calendar';
import styles from "./style"; // Importando o CSS separado

// npm install react-native-calendars
//npx expo install expo-calendar

// Configurando o calendário para o idioma português
LocaleConfig.locales['pt-BR'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-BR'; // Definindo o português como idioma padrão

const CalendarExample = ({onDateSelect}) => {
  const [selectedDate, setSelectedDate] = useState(''); // Estado para armazenar a data selecionada


  const today = new Date().toISOString().split('T')[0]; // Obtendo a data de hoje no formato AAAA-MM-DD

  // Função para tratar a seleção de uma data no calendário
  const onDayPress = async (day) => {
    // Bloqueia a seleção de datas anteriores a hoje
    if (day.dateString < today) {
      Alert.alert('Você não pode selecionar uma data anterior à de hoje.');
      return;
    }

    setSelectedDate(day.dateString);
    onDateSelect(day.dateString); // Define a data selecionada
    console.log('Data selecionada:', day.dateString);

    // Solicita permissão para acessar o calendário do dispositivo
    const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada para acessar o calendário.');
      return;
    }
  };

  // Função para abrir o modal de seleção de horário
  const openTimeSelector = () => {
    if (!selectedDate) {
      Alert.alert('Por favor, selecione uma data primeiro.');
      return;
    }
  };

  const markedDates = {};
  for (let d = new Date(); d >= new Date(today); d.setDate(d.getDate() - 1)) {
    const dateString = d.toISOString().split('T')[0];
    markedDates[dateString] = { disabled: true, dotColor: '#555555', color: '#333333' }; // Cor de fundo mais escura para dias passados
  }

  // Função para tratar a seleção de um horário
  const selectTime = (time) => {
    
    setIsModalVisible(false); // Fecha o modal após a seleção
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={styles.text1}>Selecionar Data e Horário</Text>
      <Text>Data Selecionada: {selectedDate || 'Nenhuma data selecionada'}</Text>
      
      {/* Calendário com marcação das datas disponíveis */}
      <Calendar
        onDayPress={onDayPress} // Função chamada ao pressionar uma data
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }, // Marca a data selecionada
        }}
        minDate={today} // Define que a data mínima é a de hoje

        theme={{
            backgroundColor: '#000000',        // Fundo do calendário
            calendarBackground: '#000000',     // Fundo do calendário
            textSectionTitleColor: '#ffffff',  // Cor do título (dias da semana)
            dayTextColor: '#ffffff',           // Cor dos dias
            todayTextColor: '#ff6347',         // Cor do texto para o dia atual
            selectedDayBackgroundColor: '#ff6347', // Cor de fundo para o dia selecionado
            selectedDayTextColor: '#ffffff',   // Cor do texto do dia selecionado
            monthTextColor: '#ffffff',         // Cor do texto do mês
            arrowColor: '#ff6347',             // Cor das setas de navegação
            textDisabledColor: '#999999',      // Cor do texto para dias desativados (ex: datas anteriores)
            dotColor: '#ff6347',               // Cor dos pontos de marcação de eventos
            selectedDotColor: '#ffffff',       // Cor dos pontos para o dia selecionado
            todayBackgroundColor: '#444444',   // Cor de fundo para o dia atual
            textDayFontFamily: 'Roboto',    // Fonte dos dias
            textMonthFontFamily: 'Roboto',  // Fonte do mês
            textDayHeaderFontFamily: 'Roboto', // Fonte do cabeçalho (nomes dos dias)
          }}
      />
      
      
    </View>
  );
};

export default CalendarExample;
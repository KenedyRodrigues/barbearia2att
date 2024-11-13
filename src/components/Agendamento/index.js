import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity} from "react-native"
import styles from "./style"
import Calendario from "./Calendario";
import Horario from "./Horario";
import Perfil from '../Perfil/'
 

export default function Agendamento({ navigation }){

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    

    return(
        <View style={{ padding: 10 }}>
            <Calendario onDateSelect={setSelectedDate} />
            <Horario onTimeSelect={setSelectedTime} />
            <TouchableOpacity
            onPress={() => navigation.navigate('Perfil', { selectedTime, selectedDate })}
            ><Text>Selecionei horario {selectedTime} , {selectedDate} </Text>
            </TouchableOpacity>
        </View>
    );
}

import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, Vibration, ScrollView, KeyboardAvoidingView, Platform, ImageBackground } from "react-native";
import axios from "axios";
import styles from "./style"; // Certifique-se de que o caminho para os estilos está correto

export default function Login({ navigation }) {
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  // Função para formatar o telefone
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
    }
    return value;
  };

  // Função para atualizar o número de telefone
  const handlePhoneChange = (text) => {
    const formattedPhone = formatPhoneNumber(text);
    setTelefone(formattedPhone);
  };

  // Função de login
  const handleLogin = async () => {
    if (!telefone || !senha) {
      Alert.alert('Preencha todos os campos');
      Vibration.vibrate();
      return;
    }

    try {
      const response = await axios.post('http://192.168.15.143:5000/api/login', {
        telefone,
        senha,
      });

      console.log('Resposta do servidor:', response.data);

      const { message, nome: nomeUsuario } = response.data; // Renomeie a variável aqui

      if (message === 'Login bem-sucedido!') {
        setNome(nomeUsuario); // Armazene o nome no estado se precisar
        Alert.alert('Login bem-sucedido', message);
        // Navegar para a tela de perfil e passar os parâmetros
        navigation.navigate('Perfil', { telefone, nome: nomeUsuario }); // Passando o nome
      } else {
        Alert.alert('Erro', message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro ao fazer login', 'Tente novamente mais tarde');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.viewImagem}>
          <ImageBackground
            source={require('./imagens/barbearia.png')} // Caminho da imagem de fundo
            style={styles.image}
            imageStyle={styles.roundImage}
          />
        </View>

        <View style={{ padding: 20 }}>
          <Text style={styles.text}>Telefone *</Text>
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={handlePhoneChange}
            placeholder="(DD) 0 0000-0000"
            keyboardType="numeric"
            maxLength={16} // Limita para o formato de telefone
          />

          <Text style={styles.text}>Senha *</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSenha}
            value={senha}
            placeholder="Senha"
            secureTextEntry={true}
            keyboardType="default"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              navigation.goBack(); // Exemplo de voltar para a tela anterior
            }}
          >
            <Text style={styles.textButton}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({

text1:{
    
    marginLeft: 8,
    color:"#FFFFFF",
    fontSize:28,
    fontWeight:"bold",
},

text2:{
    
    marginTop: 8,
    marginBottom: 8,
    color:"#FFFFFF",
    fontSize:20,
},
timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
},
button: {
borderWidth: 1,
borderColor: '#fff',
borderRadius: 5,
padding: 10,
margin: 5,
},
selectedButton: {
backgroundColor: '#555',
},
occupiedButton: {
backgroundColor: '#900', // Cor para horários ocupados
},
buttonText: {
color: '#fff',
},
selectedText: {
color: '#fff',
marginTop: 20,
},
container: {
padding: 10,
flex: 1,
backgroundColor: '#121212', // Cor de fundo do contêiner
},
title: {
color: '#F9F9F9',
fontSize: 20,
marginBottom: 10,
},
dateText: {
color: '#F9F9F9',
fontSize: 16,
marginBottom: 10,
},
button: {
backgroundColor: '#ff6347',
padding: 15,
borderRadius: 10,
marginVertical: 10,
},
buttonText: {
color: '#FFFFFF',
textAlign: 'center',
fontSize: 16,
},
selectedText: {
color: '#F9F9F9',
fontSize: 16,
marginVertical: 10,
},
modalContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fundo do modal com transparência
},
modalContent: {
flex: 1,
backgroundColor: '#444444', // Cor de fundo do modal
borderRadius: 10,
padding: 20,
justifyContent: 'center', // Centraliza o conteúdo no modal
},
modalTitle: {
color: '#F9F9F9',
fontSize: 20,
marginBottom: 10,
},
timeOption: {
backgroundColor: '#2E2E2E',
padding: 15,
borderRadius: 10,
marginBottom: 10,
borderWidth: 1,
borderColor: '#444444', // Borda do horário
elevation: 3, // Sombra para efeito de destaque
},
timeText: {
color: '#F9F9F9',
fontSize: 16,
textAlign: 'center',
},
closeButton: {
backgroundColor: '#ff6347',
padding: 10,
borderRadius: 10,
marginTop: 15,
},
closeButtonText: {
color: '#FFFFFF',
textAlign: 'center',
fontSize: 16,
},

});

export default styles
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D2D',
    width: '100%',
    height: '100%',
  },
  containerItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  textPrincipal: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  iconContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerConteudo: {
    width: '70%',
    height: '60%',
    margin: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  textSecundario: {
    padding: 20,
    fontSize: 18,
    fontWeight: 'normal',
    color: '#fff',
  },
  buttonEscolher: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    borderStyle: 'dashed',
    marginLeft: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPlaceholder: {
    fontSize: 16,
    color: '#aaa',
  },
  button: {
    borderRadius: 20,
    width: '70%',
    height: 50,
    backgroundColor: '#000',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#000',
  },
  barbeiroItem: {
    padding: 15,
    backgroundColor: '#4A4A4A',
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  textBarbeiro: {
    color: '#fff',
    fontSize: 16,
  },
  textButtonConfirmar:{
    fontSize: 18,
    fontWeight: 'normal',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Fundo semitransparente
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  buttonFecharModal: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2D2D2D',
    borderRadius: 5,
  },
  textButtonFechar: {
    color: '#fff',
    fontSize: 16
  },
  selectedOption: {
    backgroundColor: '#add8e6',
  },
  
});

export default styles;
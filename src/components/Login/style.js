import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

container: {
    flex: 1,
    
    },
viewImagem: {

    justifyContent: 'flex-start',
    alignItems: 'center', 
    
    },

image: {
    marginTop: 15,
    width: 250, 
    height: 250,
    marginBottom: 30,
    },

roundImage: {
    borderRadius: 250, 
    },


text:{
marginLeft: 20,
color:"#FFFFFF",
fontSize:18,
fontWeight:"bold",
},
input:{
    
    width:"90%",
    borderRadius:50,
    backgroundColor:"#f6f6f6",
    height:50,
    margin:12,
    paddingLeft:10,
},
avoid:{
    padding:10
},

button:{
    borderRadius:50,
    width:"90%",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#1C1C1C",
    paddingTop:10,
    paddingBottom:14,
    margin:12
},
button2:{
    borderRadius:50,
    width:"90%",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#707070",
    paddingTop:10,
    paddingBottom:14,
    margin:12
},

textButton:{
    fontSize: 20,
    color: "#FFFAF0",
},

});

export default styles
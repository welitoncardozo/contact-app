import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,  
  Text,
  ScrollView,
  Pressable  
} from 'react-native';

export default function App() {
  const [contact, setContact] = useState({ name: '', email: '', phone: undefined });
  const [messageError, setMessageError] = useState('');
  const [contactList, setContactList] = useState([]);

  const addContact = () => {    
    const isContactAlreadyExists = contactList.some(({ name }) => contact.name === name);
    setMessageError(isContactAlreadyExists ? 'Contato já existente com esse nome, selecione outro!' : '');
    if (isContactAlreadyExists) return;

    setContactList(oldContactList => [...oldContactList, contact]);
    setContact({});
  };

  const clearContact = () => {
    setContact({});
    setMessageError('');
  };  

  const isCannotAddContact = () => !contact.name || !contact.email || !contact.phone;

  return (
    <View style={styles.container}>
      {messageError && <Text style={styles.messageError}>{messageError}</Text>}
      
      <Text style={styles.title}>Gerenciador de Contatos</Text>

      <View style = {styles.lineStyle} />

      <View style={styles.form}>      
        <TextInput          
          style={styles.name}
          placeholder='Nome'
          value={contact.name}
          onChangeText={(name) => setContact({...contact, name})}
        />

        <TextInput
          style={styles.email}          
          placeholder='Email'
          value={contact.email}
          onChangeText={(email) => setContact({...contact, email})}
        />

        <TextInput          
          style={styles.phone}
          placeholder='Telefone'
          value={contact.phone}
          onChangeText={(phone) => setContact({...contact, phone})}
        />
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={styles.button(isCannotAddContact)}          
          onPress={addContact}
          disabled={isCannotAddContact}
        >
          <Text>Salvar</Text>
        </Pressable>

        <Pressable
          style={styles.button(false)}
          onPress={clearContact}
        >
          <Text>Cancelar</Text>
        </Pressable>
      </View>

      <View style={styles.lineStyle} />

      <View style={styles.taskList}>
        <ScrollView>
          {contactList.map(({ name, email, phone }) => {
            return (
              <View key={name}>
                <View style={styles.contact}>
                  <Text>
                    {name}
                  </Text>

                  <Text>
                    {email} - {phone}
                  </Text>                
                </View>

                <View style={ {...styles.lineStyle, ...{ backgroundColor: '#c0c0c0' }} } />
              </View>              
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 42
  },
  messageError: {
    color: '#ff0000',
    fontSize: 18,    
    textAlign: 'center',
    padding: 12
  },
  lineStyle:{
    height: 1,    
    backgroundColor: '#008040',
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    backgroundColor: '#008040',
    height: 60,
    color: '#FFFFFF',
    fontSize: 18,
    padding: 20
  },
  form: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8
  },
  name: {
    width: '100%',
    height: 20
  },
  email: {
    width: '50%',
    height: 20,    
  },
  phone: {
    width: '50%',
    height: 20,
    paddingLeft: 8
  },
  buttons: {    
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
    marginRight: 8    
  },
  button: (isDisable) => {
    return {
      width: 180,    
      padding: 10,
      backgroundColor: isDisable ? '#c0c0c0' : '#008040',
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    }
  },
  contact: {
    paddingLeft: 10,
    paddingRight: 10
  }
});

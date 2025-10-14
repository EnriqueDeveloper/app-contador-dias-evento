import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);

  const calculateDaysLeft = (date) => {
    const today = new Date();
    const target = new Date(date);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays);
  };

  const onChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      calculateDaysLeft(date);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cuántos días faltan?</Text>
      <Text style={{marginBottom:5}}>Selecciona la fecha del evento</Text>
      <TouchableOpacity style={styles.boton} title="Seleccionar fecha" onPress={() => setShowPicker(true)} >
        <Text style={styles.textoboton}>Seleccionar fecha</Text>
      {showPicker && (
        <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={onChange}
        />
      )}
      </TouchableOpacity>
      {daysLeft !== null && (
        <View style={styles.containertext}>
        <Text style={{marginTop:20 , fontSize:20}}>
          Faltan 
        </Text>
        <Text style={styles.result}>{daysLeft}</Text>
        <Text style={{fontSize:20}}>
          día{daysLeft !== 1 ? 's' : ''} para tu evento
        </Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20
  },
  containertext:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { 
    fontSize: 28, 
    marginBottom: 15 ,
    fontWeight:'bold'
  },
  result: { 
    fontSize: 55, 
    
    color: '#007AFF' ,
    fontWeight:'bold'
  },
  boton:{
    backgroundColor:'#007AFF',
    color:'#fff',
    borderRadius:12,
  },
  textoboton:{
    color:'#fff',
    fontSize:18,
    paddingHorizontal:50,
    paddingVertical:15,
    fontWeight:'600'
  }
});

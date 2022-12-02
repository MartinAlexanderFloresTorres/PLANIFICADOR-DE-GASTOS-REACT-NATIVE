import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import usePresupuesto from '../hooks/usePresupuesto';

const FiltrarGastos = () => {
  // usePresupuesto
  const { setFiltro, filtro } = usePresupuesto();

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Filtrar Gastos</Text>
      <Picker
        style={styles.picker}
        selectedValue={filtro}
        onValueChange={setFiltro}
      >
        <Picker.Item label="Todos" value="" />
        <Picker.Item label="Suscripciones" value="suscripciones" />
        <Picker.Item label="Ahorro" value="ahorro" />
        <Picker.Item label="Comida" value="comida" />
        <Picker.Item label="Gastos" value="gastos" />
        <Picker.Item label="Salud" value="salud" />
        <Picker.Item label="Casa" value="casa" />
        <Picker.Item label="Ocio" value="ocio" />
        <Picker.Item label="Otros" value="otros" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#64748b',
  },
  picker: {
    color: '#64748b',
  },
});

export default FiltrarGastos;

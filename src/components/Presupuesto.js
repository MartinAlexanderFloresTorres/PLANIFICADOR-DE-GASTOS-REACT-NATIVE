import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import usePresupuesto from '../hooks/usePresupuesto';
import { globalStyles } from '../styles/globalStyles';

const Presupuesto = () => {
  // usePresupuesto
  const { setPresupuesto, presupuesto, validarPresupuesto } = usePresupuesto();

  return (
    <>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerText}>Planificador de presupuesto</Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.cardText}>Presupuesto</Text>
        <TextInput
          style={globalStyles.cardInput}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor={'#94a3b8'}
          cursorColor="#3b82f6"
          value={presupuesto}
          onChangeText={text => setPresupuesto(Number(text))}
        />
        <Pressable
          style={globalStyles.cardButton}
          onPress={() => validarPresupuesto(presupuesto)}
        >
          <Text style={globalStyles.cardButtonText}>Añadir</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Presupuesto;

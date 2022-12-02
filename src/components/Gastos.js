import { View, Text } from 'react-native';
import React from 'react';
import usePresupuesto from '../hooks/usePresupuesto';
import Gasto from './Gasto';
import { globalStyles } from '../styles/globalStyles';

const Gastos = () => {
  // usePresupuesto
  const { gastosFiltrados } = usePresupuesto();
  return (
    <View>
      {gastosFiltrados.length > 0 ? (
        gastosFiltrados.map(gasto => <Gasto key={gasto.id} gasto={gasto} />)
      ) : (
        <Text style={globalStyles.titulo}>No hay gastos</Text>
      )}
    </View>
  );
};

export default Gastos;

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { formatMoney } from '../helpers';
import usePresupuesto from '../hooks/usePresupuesto';
import FiltrarGastos from './FiltrarGastos';
import Gastos from './Gastos';
import { globalStyles } from '../styles/globalStyles';

const ControlPresupuesto = () => {
  // Estados
  const [porcentaje, setPorcentaje] = useState(0);
  const [color, setColor] = useState('green');

  // usePresupuesto
  const { presupuesto, restante, gastados, restablecerPresupuesto } =
    usePresupuesto();

  useEffect(() => {
    setPorcentaje((((presupuesto - restante) / presupuesto) * 100).toFixed());
    setColor(
      porcentaje > 75 ? '#ef4444' : porcentaje > 50 ? '#FFA500' : '#10b981',
    );
  }, [presupuesto, restante, porcentaje]);

  return (
    <ScrollView>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerText}>Planificador de presupuesto</Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={[globalStyles.porcentaje, { color }]}>
          Gastado {porcentaje > presupuesto ? 100 : porcentaje}%
        </Text>
        <View style={globalStyles.cardGraficoBorder}>
          <View
            style={[
              globalStyles.cardGrafico,
              { width: porcentaje + '%', backgroundColor: color },
            ]}
          />
        </View>
        <View>
          <Text style={[globalStyles.cardText, globalStyles.center]}>
            Presupuesto:{' '}
            <Text style={globalStyles.gris}>{formatMoney(presupuesto)}</Text>
          </Text>
          <Text style={[globalStyles.cardText, globalStyles.center]}>
            Disponible:{' '}
            <Text style={[globalStyles.gris, { color }]}>
              {formatMoney(restante)}
            </Text>
          </Text>
          <Text style={[globalStyles.cardText, globalStyles.center]}>
            Gastado:{' '}
            <Text style={globalStyles.gris}>{formatMoney(gastados)}</Text>
          </Text>
          <Pressable style={globalStyles.botonGray}>
            <Text
              style={globalStyles.cardButtonText}
              onPress={restablecerPresupuesto}
            >
              Reiniciar App
            </Text>
          </Pressable>
        </View>
      </View>

      <FiltrarGastos />
      <Gastos />
    </ScrollView>
  );
};

export default ControlPresupuesto;

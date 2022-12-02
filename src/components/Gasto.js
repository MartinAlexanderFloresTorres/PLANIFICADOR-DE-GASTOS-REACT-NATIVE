import { Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { formatDate, formatMoney } from '../helpers';
import usePresupuesto from '../hooks/usePresupuesto';

const imagenes = {
  comida: require('../assets/img/icono_comida.png'),
  ahorro: require('../assets/img/icono_ahorro.png'),
  salud: require('../assets/img/icono_salud.png'),
  casa: require('../assets/img/icono_casa.png'),
  ocio: require('../assets/img/icono_ocio.png'),
  gastos: require('../assets/img/icono_gastos.png'),
  suscripciones: require('../assets/img/icono_suscripciones.png'),
  otros: require('../assets/img/nuevo-gasto.png'),
};

const Gasto = ({ gasto }) => {
  const { nombre, precio, categoria, fecha } = gasto;

  // usePresupuesto
  const { setGastoEdit, mostrarModal } = usePresupuesto();

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        setGastoEdit(gasto);
        mostrarModal();
      }}
    >
      <Image style={styles.image} source={imagenes[categoria]} />
      <Text style={styles.categoria}>{categoria}</Text>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.precio}>{formatMoney(precio)}</Text>
      <Text style={styles.fecha}>{formatDate(fecha)}</Text>
    </Pressable>
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
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  categoria: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  nombre: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#64748b',
  },
  precio: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
    color: '#3b82f6',
  },
  fecha: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#94a3b8',
  },
});

export default Gasto;

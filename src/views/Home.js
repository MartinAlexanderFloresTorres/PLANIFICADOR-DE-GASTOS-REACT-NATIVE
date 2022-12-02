import React from 'react';
import { Image, Modal, Pressable, SafeAreaView } from 'react-native';
import ControlPresupuesto from '../components/ControlPresupuesto';
import FormularioGasto from '../components/FormularioGasto';
import Presupuesto from '../components/Presupuesto';
import usePresupuesto from '../hooks/usePresupuesto';
import { globalStyles } from '../styles/globalStyles';

const Home = () => {
  // usePresupuesto
  const { isValidPresupuesto, modal, mostrarModal } = usePresupuesto();

  return (
    <SafeAreaView style={globalStyles.container}>
      {isValidPresupuesto ? (
        <>
          <ControlPresupuesto />
          <Pressable style={globalStyles.botonAdd} onPress={mostrarModal}>
            <Image
              style={globalStyles.botonAddImage}
              source={require('../assets/img/nuevo-gasto.png')}
            />
          </Pressable>
        </>
      ) : (
        <Presupuesto />
      )}

      {modal && (
        <Modal animationType="slide">
          <FormularioGasto />
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default Home;

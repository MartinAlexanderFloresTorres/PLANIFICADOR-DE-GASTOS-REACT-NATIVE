import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PresupuestoContext = createContext(null);

const PresupuestoProvider = ({ children }) => {
  // Estados
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [restante, setRestante] = useState(0);
  const [gastados, setGastados] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gastoEdit, setGastoEdit] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  // Efecctos
  useEffect(() => {
    if (isValidPresupuesto) {
      const totalGastos = gastos.reduce((acc, gasto) => acc + gasto?.precio, 0);
      setGastados(totalGastos);
      setRestante(presupuesto - totalGastos);

      (async () => {
        try {
          await AsyncStorage.setItem('presupuesto', presupuesto.toString());
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [gastos, isValidPresupuesto, presupuesto]);

  // Efecto de storage para preservar el presupuesto
  useEffect(() => {
    (async () => {
      try {
        const storagePresupuesto = await AsyncStorage.getItem('presupuesto');
        if (storagePresupuesto) {
          setIsValidPresupuesto(true);
          setPresupuesto(Number(storagePresupuesto));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Efecto de gastros filtrados
  useEffect(() => {
    if (filtro) {
      const filtros = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(filtros);
    } else {
      setGastosFiltrados(gastos);
    }
  }, [filtro, gastos]);

  // Efecto para guardar los gastos en el storage
  useEffect(() => {
    (async () => {
      try {
        if (gastos.length > 0) {
          await AsyncStorage.setItem('gastos', JSON.stringify(gastos));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [gastos]);

  // Efecto para obtener los gastos del storage
  useEffect(() => {
    (async () => {
      try {
        const storageGastos = await AsyncStorage.getItem('gastos');
        if (storageGastos) {
          setGastos(JSON.parse(storageGastos) || []);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Mostrar modal
  const mostrarModal = () => {
    setModal(true);
  };

  // Ocultar modal
  const ocultarModal = () => {
    setModal(false);
    setGastoEdit(null);
  };

  // validar presupuesto
  const validarPresupuesto = monto => {
    const valido = Number(monto) > 0 && Number(monto) <= 1000000;
    if (valido) {
      setIsValidPresupuesto(valido);
    } else {
      Alert.alert(
        'Error',
        'El presupuesto debe ser mayor a 0 y menor a 1.000.000',
      );
    }
  };

  // agregar gasto
  const agregarGasto = gasto => {
    setGastos([...gastos, gasto]);
  };

  // Editar gasto
  const editarGasto = gasto => {
    const gastosActualizados = gastos.map(g => (g.id === gasto.id ? gasto : g));
    setGastos(gastosActualizados);
  };

  // Eliminar gasto
  const eliminarGasto = id => {
    Alert.alert(
      'Eliminar gasto',
      '¿Estás seguro de eliminar este gasto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            const gastosActualizados = gastos.filter(g => g.id !== id);
            setGastos(gastosActualizados);
            ocultarModal();
          },
        },
      ],
      { cancelable: false },
    );
  };

  // restablecer presupuesto
  const restablecerPresupuesto = () => {
    Alert.alert('Resetear App', '¿Estás seguro de resetear la app?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Resetear',
        onPress: () => {
          (async () => {
            try {
              setPresupuesto(0);
              setIsValidPresupuesto(false);
              setRestante(0);
              setGastos([]);
              Promise.all([
                await AsyncStorage.removeItem('presupuesto'),
                await AsyncStorage.removeItem('gastos'),
              ]);
            } catch (error) {
              console.log(error);
            }
          })();
        },
      },
    ]);
  };
  return (
    <PresupuestoContext.Provider
      value={{
        validarPresupuesto,
        setPresupuesto,
        presupuesto,
        isValidPresupuesto,
        gastos,
        restante,
        gastados,
        agregarGasto,
        restablecerPresupuesto,
        modal,
        mostrarModal,
        ocultarModal,
        editarGasto,
        eliminarGasto,
        setGastoEdit,
        gastoEdit,
        setFiltro,
        filtro,
        gastosFiltrados,
      }}
    >
      {children}
    </PresupuestoContext.Provider>
  );
};

export { PresupuestoContext };
export default PresupuestoProvider;

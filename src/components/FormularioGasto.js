import React, { useEffect, useState } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import usePresupuesto from '../hooks/usePresupuesto';
import { generateId } from '../helpers';
import { globalStyles } from '../styles/globalStyles';

const INICIAL_STATE = {
  nombre: '',
  precio: '',
  categoria: '',
};

const FormularioGasto = () => {
  // Estados
  const [datos, setDatos] = useState(INICIAL_STATE);

  // usePresupuesto
  const {
    agregarGasto,
    ocultarModal,
    editarGasto,
    eliminarGasto,
    gastoEdit,
    gastos,
  } = usePresupuesto();

  // Efecto de edición
  useEffect(() => {
    if (gastoEdit) {
      setDatos({
        nombre: gastoEdit.nombre,
        precio: gastoEdit.precio,
        categoria: gastoEdit.categoria,
      });
    }
  }, [gastoEdit]);

  // handle agregar gasto
  const handleAgregarGasto = () => {
    // Validar
    if (Object.values(datos).includes('')) {
      Alert.alert('Validación', 'Todos los campos son obligatorios');
      return;
    }

    // precio menor al presupuesto
    if (Number(datos.precio) <= 0) {
      Alert.alert('Validación', 'El precio debe ser mayor a 0');
      return;
    }

    // precio menor al presupuesto
    if (Number(datos.precio) > 100000) {
      Alert.alert('Validación', 'El precio debe ser menor a 100000');
      return;
    }

    // nombre max 20 caracteres
    if (datos.nombre.length > 20) {
      Alert.alert('Validación', 'El nombre debe tener máximo 20 caracteres');
      return;
    }

    if (!gastoEdit) {
      // nombre unico
      const gastoExistente = gastos.find(
        g => g.nombre.toLowerCase() === datos.nombre.toLowerCase(),
      );
      if (gastoExistente) {
        Alert.alert(
          'Validación',
          `El nombre del gasto ${datos.nombre} ya existe`,
        );
        return;
      }
    }

    // Editar gasto
    if (gastoEdit) {
      editarGasto({ id: gastoEdit.id, fecha: gastoEdit.fecha, ...datos });
    } else {
      // Agregar gasto
      agregarGasto({ id: generateId(), fecha: new Date(), ...datos });
    }
    // ocultar modal
    ocultarModal();
    // resetear formulario
    setDatos(INICIAL_STATE);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formulario}>
          <Text style={styles.titulo}>
            {gastoEdit ? 'Actualiza Tu Gasto' : 'Nuevo Gasto'}
          </Text>

          <View style={styles.box}>
            <Text style={styles.labelText}>Nombre Gasto</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del gasto"
              placeholderTextColor={'#94a3b8'}
              cursorColor="#3b82f6"
              value={datos.nombre}
              onChangeText={text => setDatos({ ...datos, nombre: text })}
            />
          </View>

          <View style={styles.box}>
            <Text style={styles.labelText}>Precio Gasto</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="numeric"
              placeholderTextColor={'#94a3b8'}
              cursorColor="#3b82f6"
              value={datos.precio.toString()}
              onChangeText={text =>
                setDatos({ ...datos, precio: Number(text) || '' })
              }
            />
          </View>

          <View style={styles.box}>
            <Text style={styles.labelText}>Categoria Gasto</Text>
            <Picker
              selectedValue={datos.categoria}
              onValueChange={itemValue => {
                setDatos({ ...datos, categoria: itemValue });
              }}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione una categoria" value="" />
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

          <View style={styles.box}>
            <Pressable
              style={globalStyles.cardButton}
              onPress={handleAgregarGasto}
            >
              <Text style={globalStyles.cardButtonText}>
                {gastoEdit ? 'Guardar' : 'Añadir'}
              </Text>
            </Pressable>
          </View>

          {gastoEdit && (
            <View style={styles.box}>
              <Pressable
                style={globalStyles.cardButtonDelete}
                onPress={() => eliminarGasto(gastoEdit.id)}
              >
                <Text style={globalStyles.cardButtonText}>Eliminar Gasto</Text>
              </Pressable>
            </View>
          )}

          <Pressable style={globalStyles.botonGray} onPress={ocultarModal}>
            <Text style={globalStyles.cardButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#3b82f6',
    flex: 1,
  },
  formulario: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#3b82f6',
  },
  box: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#64748b',
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#3b82f6',
    color: '#64748b',
  },
  picker: {
    color: '#64748b',
  },
});
export default FormularioGasto;

import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#3b82f6',
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 70,
  },
  headerText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    transform: [{ translateY: -40 }],
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  cardText: {
    color: '#3b82f6',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  cardInput: {
    backgroundColor: '#f5f5f5',
    color: '#64748b',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  cardButton: {
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 5,
  },
  cardButtonDelete: {
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 5,
  },
  cardButtonText: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 16,
  },
  gris: {
    color: '#64748b',
  },
  porcentaje: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },
  cardGraficoBorder: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'flex-start',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 40,
  },
  cardGrafico: {
    height: 20,
    borderRadius: 5,
  },
  center: {
    textAlign: 'center',
  },
  botonAdd: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  botonGray: {
    backgroundColor: '#64748b',
    padding: 10,
    borderRadius: 5,
  },
  botonAddImage: {
    width: 60,
    height: 60,
  },
});

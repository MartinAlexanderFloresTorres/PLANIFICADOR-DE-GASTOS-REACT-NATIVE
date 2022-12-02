import { useContext } from 'react';
import { PresupuestoContext } from '../providers/PresupuestoProvider';

const usePresupuesto = () => {
  return useContext(PresupuestoContext);
};

export default usePresupuesto;

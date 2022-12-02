/**
 * Generar id único
 * @returns {string} id
 * @example generateId() => '1a2b3c4d5e'
 */

export const generateId = () => {
  const fecha = new Date().toString(32).substr(2);
  const random = Math.random().toString(32).substr(2);
  return `${fecha}-${random}`;
};

/**
 * Formatear fecha
 * @param {string} fecha
 * @returns {string} fecha formateada
 * @example formatearFecha('2020-12-31T00:00:00.000Z') => '31 de diciembre de 2020'
 */

export const formatDate = fecha => {
  const date = new Date(fecha);

  const config = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('es-ES', config);
};

/**
 * Formatear dinero
 * @param {number} dinero
 * @returns {string} dinero formateado
 * @example formatMoney(1000) => 's/. 1,000.00'
 */

export const formatMoney = dinero => {
  if (typeof dinero === 'string') {
    dinero = Number(dinero);
  }
  return dinero.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
  });
};

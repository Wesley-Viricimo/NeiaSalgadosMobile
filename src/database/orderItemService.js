import { executeCommand, getFirstRow } from "./database";

// Adicionar ou atualizar um item
export const upsertOrderItem = async (id, quantity, price, observation = "") => {
  const query = `
    INSERT INTO orderItem (id, quantity, price, observation)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET 
      quantity = excluded.quantity,
      price = excluded.price,
      observation = excluded.observation;
  `;
  const result = await executeCommand(query, [id, quantity, price, observation]);
  return result;
};

// Buscar item pelo ID
export const getOrderItemById = async (id) => {
  const query = `SELECT * FROM orderItem WHERE id = ?;`;
  const result = await getFirstRow(query, [id]);
  return result || null;
};

// Remover item pelo ID
export const removeOrderItemById = async (id) => {
  const query = `DELETE FROM orderItem WHERE id = ?;`;
  const result = await executeCommand(query, [id]);
  return result;
};
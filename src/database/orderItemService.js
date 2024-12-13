import { executeCommand, getFirstRow } from "./database";

// Adicionar ou atualizar um item no banco
export const upsertOrderItem = async (id, quantity, price, observation = "") => {
  const query = `
    INSERT INTO orderItem (id, quantity, price, observation)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET 
      quantity = excluded.quantity,
      price = excluded.price,
      observation = excluded.observation;
  `;
  return await executeCommand(query, [id, quantity, price, observation]);
};

// Buscar item pelo ID
export const getOrderItemById = async (id) => {
  const query = "SELECT * FROM orderItem WHERE id = ?";
  return await getFirstRow(query, [id]);
};

// Remover item pelo ID
export const removeOrderItemById = async (id) => {
  const query = "DELETE FROM orderItem WHERE id = ?";
  return await executeCommand(query, [id]);
};

export const sumOrderItemQuantities = async () => {
  const query = "SELECT SUM(quantity) as totalQuantity FROM orderItem";
  return executeCommand(query);
};
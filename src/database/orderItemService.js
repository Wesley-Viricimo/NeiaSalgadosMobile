import { executeCommand, getFirstRow, executeQuery } from "./database";

// Adicionar ou atualizar um item no banco
export const upsertOrderItem = async (id, description, quantity, price, observation = "") => {
  const query = `
    INSERT INTO orderItem (id, description, quantity, price, observation)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET 
      description = excluded.description,
      quantity = excluded.quantity,
      price = excluded.price,
      observation = excluded.observation;
  `;
  return await executeCommand(query, [id, description, quantity, price, observation]);
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
  const query = "SELECT SUM(quantity) AS totalQuantity, SUM(quantity * price) AS totalPrice FROM orderItem";
  const result = await executeQuery(query);
  return {
      totalQuantity: result.totalQuantity || 0,
      totalPrice: result.totalPrice || 0,
  };
};
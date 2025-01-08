import { executeCommand, getFirstRow, executeQuery, executeQueryAll } from "./database";

// Tipagem para o retorno da consulta
interface SumOrderItemResult {
    totalQuantity: number | null;
    totalPrice: number | null;
}

// Adicionar ou atualizar um item no banco
export const upsertOrderItem = async (id: number, description: string, quantity: number, price: number, observation = "") => {
    const query = `
    INSERT INTO orderItem (id, description, quantity, price, observation)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET 
      description = excluded.description,
      quantity = excluded.quantity,
      price = excluded.price,
      observation = excluded.observation;
  `;
    return await executeCommand(query, [id, description, quantity, price, observation]);
};

// Buscar item pelo ID
export const getOrderItemById = async (id: number) => {
    const query = "SELECT * FROM orderItem WHERE id = ?";
    return await getFirstRow(query, [id]);
};

export const getAllOrderItem = async () => {
    const query = "SELECT * FROM orderItem";
    return await executeQueryAll(query);
};

// Remover item pelo ID
export const removeOrderItemById = async (id: number) => {
    const query = "DELETE FROM orderItem WHERE id = ?";
    return await executeCommand(query, [id]);
};

export const sumOrderItemQuantities = async (): Promise<{ totalQuantity: number; totalPrice: number }> => {
    const query = "SELECT SUM(quantity) AS totalQuantity, SUM(quantity * price) AS totalPrice FROM orderItem";

    // Usando o tipo genérico para garantir que 'result' terá a estrutura correta
    const result = await executeQuery<SumOrderItemResult>(query);

    return {
        totalQuantity: result.totalQuantity ?? 0,  // Usando nullish coalescing (??) para tratar null ou undefined
        totalPrice: result.totalPrice ?? 0,        // O valor padrão será 0 se for null ou undefined
    };
};
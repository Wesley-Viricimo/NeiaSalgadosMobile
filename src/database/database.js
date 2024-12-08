import * as SQLite from "expo-sqlite";

let dbInstance = null;

// Inicializa o banco de dados ou retorna a instância existente
export const initializeDatabase = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("neiasalgados.db");

    // Configurações e criação de tabelas
    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS orderItem (
        id INTEGER PRIMARY KEY NOT NULL,
        quantity INTEGER NOT NULL,
        observation TEXT
      );
    `);

    console.log("Banco de dados inicializado e tabela 'orderItem' criada.");
  }
  return dbInstance;
};

// Funções utilitárias para o banco de dados
export const executeCommand = async (query, params = []) => {
  if (!dbInstance) {
    await initializeDatabase();
  }
  const result = await dbInstance.runAsync(query, params);
  console.log("Execução do comando concluída:", result);
  return result;
};

export const getFirstRow = async (query, params = []) => {
  if (!dbInstance) {
    await initializeDatabase();
  }
  const result = await dbInstance.getFirstAsync(query, params);
  console.log("Primeira linha:", result);
  return result;
};

export const getAllRows = async (query, params = []) => {
  if (!dbInstance) {
    await initializeDatabase();
  }
  const rows = await dbInstance.getAllAsync(query, params);
  console.log("Todas as linhas:", rows);
  return rows;
};
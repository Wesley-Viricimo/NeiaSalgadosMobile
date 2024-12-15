import * as SQLite from "expo-sqlite";

let dbInstance = null;

// Inicializa o banco de dados ou retorna a instância existente
export const initializeDatabase = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("neiasalgados");

    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS orderItem (
        id INTEGER PRIMARY KEY NOT NULL,
        description TEXT,
        quantity INTEGER NOT NULL,
        price FLOAT,
        observation TEXT
      );
    `);

  }
  return dbInstance;
};

// Função utilitária para execução de comandos
export const executeCommand = async (query, params = []) => {
  if (!dbInstance) await initializeDatabase();
  const result = await dbInstance.runAsync(query, params);
  return result;
};

// Função para execução de consultas de leitura (SELECT)
export const executeQuery = async (query, params = []) => {
  if (!dbInstance) await initializeDatabase();
  const result = await dbInstance.getFirstAsync(query, params); // Usando getFirstAsync para pegar o primeiro resultado
  return result;
};

// Obter a primeira linha do resultado
export const getFirstRow = async (query, params = []) => {
  if (!dbInstance) await initializeDatabase();
  const row = await dbInstance.getFirstAsync(query, params);
  return row;
};

// Obter todas as linhas do resultado
export const getAllRows = async (query, params = []) => {
  if (!dbInstance) await initializeDatabase();
  const rows = await dbInstance.getAllAsync(query, params);
  return rows;
};
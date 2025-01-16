import * as SQLite from "expo-sqlite";

// Definindo a instância do banco como tipo do SQLite.Database
let dbInstance: SQLite.SQLiteDatabase;

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
export const executeCommand = async (query: string, params: any[] = []) => {
  if (!dbInstance) await initializeDatabase();
  const result = await dbInstance.runAsync(query, params);
  return result;
};

// Função para execução de consultas de leitura (SELECT)
export const executeQuery = async <T>(query: string, params: any[] = []): Promise<T> => {
  if (!dbInstance) await initializeDatabase();
  const result = await dbInstance.getFirstAsync(query, params); // Usando getFirstAsync para pegar o primeiro resultado
  return result as T;
};

export const executeQueryAll = async (query: string, params: any[] = []) => {
  if (!dbInstance) await initializeDatabase();
  const result = await dbInstance.getAllAsync(query, params); // Usando getAllAsync para pegar todos os resultados
  return result;
};

// Obter a primeira linha do resultado
export const getFirstRow = async (query: string, params: any[] = []) => {
  if (!dbInstance) await initializeDatabase();
  const row = await dbInstance.getFirstAsync(query, params);
  return row;
};

// Obter todas as linhas do resultado
export const getAllRows = async (query: string, params: any[] = []) => {
  if (!dbInstance) await initializeDatabase();
  const rows = await dbInstance.getAllAsync(query, params);
  return rows;
};

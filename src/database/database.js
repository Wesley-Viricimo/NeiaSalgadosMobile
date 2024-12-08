import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

let dbInstance = null;

// Inicializa o banco de dados ou retorna a instância existente
export const initializeDatabase = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("neiasalgados.db");

    // Mova o banco de dados para um diretório acessível
    const fileUri = FileSystem.documentDirectory + "neiasalgados.db";
    await FileSystem.moveAsync({
      from: dbInstance,
      to: fileUri,
    });
    console.log("Banco de dados movido para:", fileUri);

    // Configurações e criação de tabelas
    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS orderItem (
        id INTEGER PRIMARY KEY NOT NULL,
        quantity INTEGER NOT NULL,
        price FLOAT,
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
import { writeFile, readFile } from 'fs/promises';

/**
 * Atualiza o database json com os dados inputados no terminal
 * @param data Dados que serão adicionados ao database
 * @return {Promise<void>}
 */
export const save = async data => {
  // Variáveis globais foram deprecated nas novas versões do NodeJS
  const { pathname: databaseFile } = new URL('./../database.json', import.meta.url);
  const currentData = JSON.parse(await readFile(databaseFile));
  currentData.push(data);

  await writeFile(databaseFile, JSON.stringify(currentData));
};

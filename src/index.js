import database from './../database.json' assert { type: 'json' };
import TerminalController from './terminal.controller.js';
import Person from './person.js';
import { save } from './repository.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q';

/**
 * Instancia de controller do terminal
 * @type {TerminalController}
 */
const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

/**
 * Funcão principal para execução do sistema no terminal
 */
async function mainLoop() {
  try {
    const answer = await terminalController.question();
    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log('Process Finished!');
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEFAULT_LANG));
    await save(person);
    return mainLoop();
  } catch (e) {
    console.log('DEU RUIM**', e);
    return mainLoop();
  }
}

await mainLoop();

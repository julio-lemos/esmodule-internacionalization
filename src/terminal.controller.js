import readline from 'readline';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import DraftLog from 'draftlog';

import Person from './person.js';

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
  }

  /**
   * Inicializa o terminal
   * @param database Base de dados que será renderizada na tabela no terminal
   * @param language Idioma de exibição (DEFAULT: en)
   */
  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, language);
  }

  /**
   * Inicializa a tabela
   * @param database Base de dados que será renderizada na tabela no terminal
   * @param language Idioma de exibição (DEFAULT: en)
   */
  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language));
    const table = chalkTable(this.getTableOptions(), data);
    this.print = console.draft(table);
    this.data = data;
  }

  /**
   * Método responsável por realizar o questionamento no terminal
   * @param msg Mensagem que será apresentada
   * @return {Promise<string>} Texto digitado no terminal
   */
  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve));
  }

  /**
   * Devolve as configurações da tabela
   * @return {{leftPad: number, columns: [{field: string, name: string},{field: string, name: string},{field: string, name: string},{field: string, name: string},{field: string, name: string}]}}
   */
  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.red('Km Traveled') },
        { field: 'from', name: chalk.green('From') },
        { field: 'to', name: chalk.blue('To') },
      ],
    };
  }

  /**
   * Método responsável por encerrar terminal
   */
  closeTerminal() {
    this.terminal.close();
  }

  /**
   * Atualiza tabela exibida no terminal
   * @param item Item que será adicionado na tabela
   */
  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions(), this.data));
  }
}

export default class Person {
  constructor({ id, vehicles, kmTraveled, from, to }) {
    this.id = id;
    this.vehicles = vehicles;
    this.kmTraveled = kmTraveled;
    this.from = from;
    this.to = to;
  }

  /**
   * Formata dados para exibição na tabela utilizando internacionalização
   * @param language Idioma que será exibido (DEFAULT: en)
   * @return {{kmTraveled: string, vehicles: string, from: string, id: number, to: string}}
   */
  formatted(language) {
    const mapDate = date => {
      const [year, month, day] = date.split('-').map(Number);

      // Datas em JS começam do zero!
      return new Date(year, month - 1, day);
    };

    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(language, { style: 'long', type: 'conjunction' }).format(this.vehicles),
      kmTraveled: new Intl.NumberFormat(language, { style: 'unit', unit: 'kilometer' }).format(this.kmTraveled),
      from: new Intl.DateTimeFormat(language, { month: 'long', day: '2-digit', year: 'numeric' }).format(
        mapDate(this.from),
      ),
      to: new Intl.DateTimeFormat(language, { month: 'long', day: '2-digit', year: 'numeric' }).format(
        mapDate(this.to),
      ),
    };
  }

  /**
   * Factory para gerar uma instancia de pessoa com base em uma string
   * @param text String no formato correto para gerar nova instancia de Person
   * @return {Person}
   */
  static generateInstanceFromString(text) {
    const EMPTY_SPACE = ' ';
    const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE);

    return new Person({
      id,
      kmTraveled,
      from,
      to,
      vehicles: vehicles.split(','),
    });
  }
}

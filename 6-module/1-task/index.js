/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

export default class UserTable {
  constructor(rows) {
      this.rows = rows;
      this.elem = document.createElement("table");
      this.makeHTML();
  }

  makeHTML() {
      let s = `
      <thead>
      <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      </tr>
      </thead>
      <tbody>` + this.rows.map(row => `
      <tr>
          <td>${row.name}</td>
          <td>${row.age}</td>
          <td>${row.salary}</td>
          <td>${row.city}</td>
          <td><button>X</button></td>
      </tr>`)
      .join("") + `</tbody>`;
      this.elem.innerHTML = s;
      for (let b of this.elem.querySelectorAll("button"))
          b.addEventListener("click", this);
  }
   handleEvent(event) {
      let row = event.target.parentElement.parentElement;
      this.rows.splice(row.rowIndex - 1, 1);
      row.remove();
  }
}

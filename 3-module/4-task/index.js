function showSalary(users, age) {
  let str = ``;
  users.filter(user => user.age <= age).forEach((element) => str += `${ element.name }, ${ element.balance }\n`);
  return str.slice(0, -1);
  };

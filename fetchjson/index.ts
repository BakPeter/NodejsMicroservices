import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface ToDo {
  id: Number;
  title: string;
  completed: boolean;
}

axios.get('https://jsonplaceholder.typicode.com/todos/1').then((res) => {
  const todo = res.data as ToDo;

  const id = todo.id;
  console.log(`
  id=${id}
  title=${todo.title}
  comleted=${todo.completed}`);
});

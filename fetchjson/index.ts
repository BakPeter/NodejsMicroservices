import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface ToDo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get('https://jsonplaceholder.typicode.com/todos/1').then((res) => {
  const todo = res.data as ToDo;
  console.log(todo);
  logTodo(todo.id, todo.title, todo.completed);
});

const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(`
    id = ${id}
    title = ${title}
    completed = ${!completed ? 'YES' : 'NO'}`);
};

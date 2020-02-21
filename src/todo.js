import { format } from 'date-fns';
import Store from './localStorage';

const Todos = () => {
  let count = 0;
  let priority = ['low', 'normal', 'high'];
  const todoList = {};
  const storeName = 'todo-storage';

  const addTodo = (todo) => {
    todoList[todo.getId()] = todo;
    Store.storeTodo(Object.values(todoList), storeName);
    return todoList[todo.getId()];
  }

  const getStoreName = () => storeName;

  const deleteTodo = (todoId) => {
    delete todoList[todoId];
  }

  const deleteTodos = (todoArr) => {
    todoArr.forEach(todo => {
      delete todoList[todo];
    })
  }

  const getTodos = () => {
    const todos = todoList;
    let result = Object.values(todos);

    result = result.filter(todo => !todo.getExpired());
    return result;
  }

  const todosByNewest = () => {
    const todos = getTodos();
    const result = Object.values(todos);

    result.sort((a, b) => {
      const timeA = a.getRawTime();
      const timeB = b.getRawTime();

      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }

      return 0;
    })

    return result;
  }

  const todosByPriority = () => {
    const todos = getTodos();
    const result = Object.values(todos);

    result.sort((a, b) => {
      const timeA = a.getPriority();
      const timeB = b.getPriority();

      if (timeA < timeB) {
        return 1;
      }
      if (timeA > timeB) {
        return -1;
      }

      return 0;
    })

    return result;
  }

  const completedTodos = () => {
    const todos = getTodos();
    let result = Object.values(todos);

    result = result.filter(todo => todo.getCompleted());

    return result;
  }

  const incompletedTodos = () => {
    const todos = getTodos();
    let result = Object.values(todos);

    result = result.filter(todo => !todo.getCompleted());

    return result;
  }

  const expiredTodos = () => {
    const todos = todoList;
    let result = Object.values(todos);

    result = result.filter(todo => todo.getExpired());
    return result;

  }

  const getTodosByIds = (arr) => {
    let todoArray = [];
    arr.forEach(id => {
      todoArray.push(todoList[id]);
    });
    return todoArray;
  }

  const getTodoAt = (index) => {
    return todoList[index];
  }

  const getId = () => {
    return count++
  }

  const getPriority = (index) => {
    return priority[index];
  }

  return {
    getId,
    getPriority,
    addTodo,
    getTodos,
    getTodoAt,
    getTodosByIds,
    getStoreName,
    deleteTodo,
    deleteTodos,
    todosByNewest,
    todosByPriority,
    completedTodos,
    incompletedTodos,
    expiredTodos
  }
}

const TodoFactory = (factoryObject) => {
  let { createdAt = Date.now(), title, duration = 0, description, priority = 1, date, time, tags = [], project, archieve = TodoArchieve } = factoryObject;
  date = new Date(date);

  date.setDate(date.getDate() + 1);

  if (time === '') {
    time = date;
    time.setHours(23);
    time.setMinutes(59);
    time.setSeconds(59);
  } else {
    const formTime = time.split(':')
    time = date;
    time.setHours(parseInt(formTime[0]));
    time.setMinutes(parseInt(formTime[1]));
  };

  let id = archieve.getId();
  let expired = false;
  let completed = false;
  let inProgress = false;

  const getId = () => id;
  const getCompleted = () => completed;
  const getPriority = () => priority;
  const getRawTime = () => time;
  const getTime = () => format(time, 'hh:mm:ssa');
  const getDate = () => format(date, 'yyyy/MM/dd');
  const getCreatedAt = () => format(createdAt, 'hh:mm:ss yyyy/MM/dd');
  const getExpired = () => {
    return expired;
  }

  const getTodoInfo = () => {
    isDue()
    return {
      id: getId(),
      createdAt: getCreatedAt(),
      title,
      description,
      priority: archieve.getPriority(priority),
      date: getDate(),
      time: getTime(),
      tags,
      project,
      expired,
      completed,
      duration,
      inProgress,
    }
  }

  const rawTodoInfo = () => {
    isDue()
    return {
      id: getId(),
      createdAt: createdAt,
      title,
      description,
      priority: priority,
      date: getDate(),
      time: getTime(),
      tags,
      project,
      expired,
      completed,
      duration,
      inProgress,
    }
  }

  const editTodo = (updatedTodo) => {
    title = updatedTodo.title;
    description = updatedTodo.description;
    priority = updatedTodo.priority ? updatedTodo.priority : priority;

    duration = updatedTodo.duration ? updatedTodo.duration * 60000 : duration;
    date = updatedTodo.date ? new Date(updatedTodo.date) : date;
    time = updatedTodo.date ? new Date(updatedTodo.date) : date;
    tags = updatedTodo.tags.split(',');
    isDue();

    return getTodoInfo();
  }

  const addTag = (tag) => {
    tags.push(tag);
  }

  const startTask = (subscriber, interval = 1000) => {
    if (completed || expired) return;

    inProgress = true;
    let count = 0;

    const chronometer = setInterval(() => {
      count++
      subscriber.receive((100 * count * interval) / duration);
    }, interval);

    setTimeout(() => {
      toggleComplete();
      clearInterval(chronometer);
    }, duration + interval)
  }

  const isDue = () => {
    if (completed || expired) return;

    if (time.getTime() < new Date().getTime()) {
      expired = true;
    }
  }

  const toggleComplete = (check) => {
    if (expired) return;

    if (check === true) {
      completed = true;
    } else {
      completed = false;
    };
  }

  return {
    getId,
    getTodoInfo,
    rawTodoInfo,
    addTag,
    getTime,
    toggleComplete,
    startTask,
    editTodo,
    getRawTime,
    getPriority,
    getCompleted,
    getExpired
  };
}

const TodoArchieve = Todos();

export { TodoFactory, TodoArchieve };

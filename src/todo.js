import { format } from 'date-fns';

const Todos = () => {
	let count = 0;
	let priority = ['low', 'normal', 'high'];
	const todoList = {};

	const addTodo = (project) => {
    todoList[project.getId()] = project;
    return todoList[project.getId()];
	}
	
	const getTodos = () => {
		return todoList;
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
    getTodosByIds
	}
}

const TodoArchieve = Todos();

const TodoFactory = (factoryObject) => {
		let {createdAt = Date.now(), title, duration = 0, description, priority = 1, date, time, tags = [], project, archieve = TodoArchieve} = factoryObject;
		priority = archieve.getPriority(priority);
		let id = archieve.getId();
		let expired = false;
		let completed = false;
		let inProgress = false;

		const getId = () => id;
		const getTime = () => format(time, 'hh:mm:ss');
		const getDate = () => format(date, 'yyyy/MM/dd');
		const getCreatedAt = () => format(createdAt, 'hh:mm:ss yyyy/MM/dd');

		const getTodoInfo = ()=> {
			isDue()
			return {
				id: getId(),
				createdAt: getCreatedAt(),
				title,
				description,
				priority,
				date: getDate(),
				time: getTime(),
				tags,
				project,
				expired,
				completed,
				duration,
				inProgress
			}
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
				subscriber.receive((100 * count * interval)/duration);
			}, interval);
	
			setTimeout(() => {
				toggleComplete();
				clearInterval(chronometer);
			}, duration + interval)
		}

		const isDue = () => {
			if (completed || expired) return;

			if(time.getTime() < new Date().getTime()) {
				expired = true;
			} 			
		}

		const getExpired = () => {
			return expired;
		}

		const toggleComplete = () => {
			if (expired) return;

			completed = !completed
		}
    return {
			getId,
			getTodoInfo,
			addTag,
			getTime, 
			getExpired,
			toggleComplete,
			startTask
		};
}

export {TodoFactory, TodoArchieve};

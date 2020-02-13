import { format } from 'date-fns';

const Todos = () => {
	let count = 0;
	let priority = ['low', 'normal', 'high'];

	const getId = () => {
		return count++
	}

	const getPriority = (index) => {
		return priority[index];
	}

	return {
		getId,
		getPriority
	}
}

const TodoArchieve = Todos();

const TodoFactory = (factoryObject) => {
		let {createdAt = Date.now(), title, description, priority = 1, date, time, tags = [], project, archieve = TodoArchieve} = factoryObject;
		priority = archieve.getPriority(priority);
		let id = archieve.getId();
		let expired = false;
		let completed = false;

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
				completed
			}
		}

		const addTag = (tag) => {
			tags.push(tag)
		}

		const isDue = () => {
			console.log()
			if(time.getDate() < new Date().getDate()) {
				expired = true;
			} 			
		}

		const getExpired = () => {
			return expired;
		}

		const toggleComplete = () => {
			completed = !completed
		}

    return {
			getId,
			getTodoInfo,
			addTag,
			getTime, 
			getExpired,
			toggleComplete
		};
}
 

let myFac = TodoFactory({title: 'test', priority: 2, time: new Date(2020, 2, 28), date: new Date(2020, 2, 23)});
console.log(myFac.getTime())
console.log(myFac.getTodoInfo())

let myFac2 = TodoFactory({title: 'test', priority: 2})
console.log(myFac2.getId())
//console.log(myFac2.getTodoInfo());

/* todo factory:

check due time (function), IMPROVE IT

in task - boolean,
taskDuration - Time in seconds,
taskCronometer (function),

 */

export {TodoFactory, TodoArchieve};
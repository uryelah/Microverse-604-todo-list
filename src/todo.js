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
				duration
			}
		}

		const addTag = (tag) => {
			tags.push(tag);
		}

		const startTask = () => {
			if (completed || expired) return;

			inProgress = true;
			let count = 1;
			/*
			const chronometer = setInterval(() => {
				console.log(`${count} seconds`);
				count++
			}, 1000)
			*/
			setTimeout(() => {
				toggleComplete();
				//clearInterval(chronometer);
			}, duration)
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
 

let myFac = TodoFactory({title: 'test', priority: 2, time: new Date(2020, 1, 14, 10, 30, 0), date: new Date(2020, 2, 23), duration: 10000});
console.log(myFac.getTime())
console.log(myFac.getTodoInfo())
console.log(myFac.startTask())

export {TodoFactory, TodoArchieve};
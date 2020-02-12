import { compareAsc, format } from 'date-fns';

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
const TodoArchieve2 = Todos();


const TodoFactory = (factoryObject) => {
		let {createdAt = Date.now(), title, description, priority = 1, date, time, tags = [], project, archieve = TodoArchieve} = factoryObject;
		priority = archieve.getPriority(priority);
		const getId = () => id;
		const getTime = () => format(time)

    let id = archieve.getId();
		
		const getTodoInfo = ()=> {
			return {
				id: getId(),
				createdAt,
				title,
				description,
				priority,
				date,
				time,
				tags,
				project
			}
		}

		const addTag = (tag) => {
			tags.push(tag)
		}

    return {
			getId,
			getTodoInfo,
			addTag,
			getTime
		};
}

let myFac = TodoFactory({title: 'test', priority: 2, time: new Date(2020, 2, 23)})
console.log(myFac.getId())
console.log(myFac.getTodoInfo());
console.log(myFac.getTime())

let myFac2 = TodoFactory({title: 'test', priority: 2})
console.log(myFac2.getId())
console.log(myFac2.getTodoInfo());

/* todo factory:

date, date
time, time
check due time (function),
expired? boolean
check expired (function),
update if it was expired (function),
completed?, boolean
mark as completed (function),
in task - boolean
tags, array

 */

export {TodoFactory, TodoArchieve};
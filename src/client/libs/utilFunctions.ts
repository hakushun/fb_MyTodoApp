import axios from 'axios';
import { Project } from '../redux/modules/projects';
import { Todo, Status } from '../redux/modules/todos';

axios.defaults.withCredentials = true;

/**
 * APIサーバへのPOST通信
 * @param uid firebase userId
 * @param data project
 */
export const savesProjects = async (
	uid: string,
	data: Project[],
): Promise<void> => {
	try {
		await axios.post(`/api/projects/${uid}/`, data);
	} catch (error) {
		alert('Failure to save project.');
	}
};

/**
 * APIサーバへのPOST通信
 * @param uid firebase userId
 * @param data todo
 */
export const saveTodos = async (uid: string, data: Todo[]): Promise<void> => {
	try {
		await axios.post(`/api/todos/${uid}/`, data);
	} catch (error) {
		alert('Failure to save todo.');
	}
};

/**
 * 重複がないようにIDを採番する関数
 * @param items projectかtodoのstate
 */
export const calculateId = (items: Project[] | Todo[]): number => {
	let id = 1;
	let max = 1;
	if (items.length > 0) {
		items.forEach((item: Project | Todo) => {
			if (max < item.id) {
				max = item.id;
			}
		});
		id = max + 1;
	}
	return id;
};

/**
 * ソートするためにstatusをnumberへ置換する関数
 */
export const statusToNumber = (status: Status): number => {
	if (status === 'new') {
		return 0;
	}
	if (status === 'in_progress') {
		return 1;
	}
	if (status === 'reviewing') {
		return 2;
	}
	if (status === 'complete') {
		return 3;
	}
	return 0;
};

/**
 * 本日の日付をstringで返す関数
 */
export const getToday = (): string => {
	const dt = new Date();
	const y = dt.getFullYear();
	const m = ('00' + (dt.getMonth() + 1)).slice(-2);
	const d = ('00' + dt.getDate()).slice(-2);
	return `${y}-${m}-${d}`;
};

/**
 * aria-hidden属性の値をtoggleする関数
 * @param boolean
 */
export const toggleAriaHidden = (boolean: boolean): void => {
	document
		.getElementById('header')
		?.setAttribute('aria-hidden', boolean.toString());
	document
		.getElementById('project_list')
		?.setAttribute('aria-hidden', boolean.toString());
	document
		.getElementById('todo_list')
		?.setAttribute('aria-hidden', boolean.toString());
};

/**
 * scrollの許可を制御する関数
 * @param boolean
 */
export const toggleScrollLock = (boolean: boolean): void => {
	const body = document.querySelector('body');
	body?.removeAttribute('style');
	boolean.toString() === 'true' &&
		body?.setAttribute('style', 'overflow:hidden;');
};

/**
 * 引数のtodosが全て完了済みかを判断する関数
 */
export const isTodosComplete = (items: Todo[]): boolean => {
	if (items.length === 0) return false;
	return items.every((item) => item.status === 'complete');
};

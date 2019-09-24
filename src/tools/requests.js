const API = 'http://localhost:3008';

export function get(entity, start, end) {
	let requestQry = `${API}/${entity}`

	if (start !== undefined) {
		requestQry+=`?_start=${start}`
	}

	if (end !== undefined) {
		requestQry+=`&_end=${end}`
	}

	return fetch(requestQry).then(res => res.json())
}

// export function put(entity,) {
// 	const  = {
// 
// 	}
// 	const req = fetch(`${API}/${entity}`, options)
// 	return .then(res => res.json())
// }
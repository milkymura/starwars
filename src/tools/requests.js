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

export function put(entity,data) {
	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}

	return fetch(`${API}/${entity}`, options)
		.then(res => res.json())
}

// no time to refactor
export function post(entity,data) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}

	return fetch(`${API}/${entity}`, options)
		.then(res => res.json())
}

// no time to refactor
export function remove(entity,data) {
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}

	return fetch(`${API}/${entity}`)
		.then(res => res.json())
}
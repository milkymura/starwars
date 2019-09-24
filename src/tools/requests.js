const API = 'http://localhost:3008';

export function get(entity) {
	return fetch(`${API}/${entity}`).then(res => res.json())
}
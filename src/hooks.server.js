import { getSessionUser } from '$lib/server/auth.js';

export async function handle({ event, resolve }) {
	event.locals.user = getSessionUser(event.cookies);
	return resolve(event);
}

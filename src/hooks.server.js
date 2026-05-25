import { getSessionUser } from '$lib/server/auth-db.js';

export async function handle({ event, resolve }) {
	try {
		event.locals.user = await getSessionUser(event.cookies);
	} catch {
		event.locals.user = null;
	}

	return resolve(event);
}

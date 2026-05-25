import { redirect } from '@sveltejs/kit';
import { clearSession } from '$lib/server/auth-db.js';

export async function POST({ cookies }) {
	await clearSession(cookies);
	throw redirect(303, '/');
}

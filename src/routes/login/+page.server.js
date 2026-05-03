import { fail, redirect } from '@sveltejs/kit';
import { setSessionCookie, verifyCredentials } from '$lib/server/auth.js';

export async function load({ locals, url }) {
	if (locals.user) {
		throw redirect(303, '/');
	}

	return {
		next: url.searchParams.get('next') ?? '/create'
	};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = String(formData.get('username') ?? '').trim();
		const password = String(formData.get('password') ?? '');
		const next = String(formData.get('next') ?? '/create');

		if (!verifyCredentials(username, password)) {
			return fail(401, {
				message: 'Invalid username or password.',
				values: { username, next }
			});
		}

		setSessionCookie(cookies, username);
		throw redirect(303, next.startsWith('/') ? next : '/create');
	}
};

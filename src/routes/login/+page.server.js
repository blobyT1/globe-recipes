import { fail, redirect } from '@sveltejs/kit';
import { AuthError, authenticateUser, createSession } from '$lib/server/auth-db.js';

function safeNext(next) {
	return next && next.startsWith('/') ? next : '/create';
}

export async function load({ locals, url }) {
	if (locals.user) {
		throw redirect(303, safeNext(url.searchParams.get('next')));
	}

	return {
		next: safeNext(url.searchParams.get('next'))
	};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = String(formData.get('username') ?? '').trim();
		const password = String(formData.get('password') ?? '');
		const next = safeNext(String(formData.get('next') ?? '/create'));

		let user = null;

		try {
			user = await authenticateUser({ username, password });
		} catch (error) {
			const message = error instanceof AuthError ? error.message : 'Could not sign in right now.';
			const status = error instanceof AuthError ? error.status : 500;
			return fail(status, {
				message,
				values: { username, next }
			});
		}

		if (!user) {
			return fail(401, {
				message: 'Invalid username or password.',
				values: { username, next }
			});
		}

		await createSession(cookies, user);
		throw redirect(303, next);
	}
};

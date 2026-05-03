import fs from 'node:fs';
import path from 'node:path';

const ROOT_ENV_PATH = path.resolve(process.cwd(), '.env');

export function loadRootEnvFile() {
	if (!fs.existsSync(ROOT_ENV_PATH)) return;

	const content = fs.readFileSync(ROOT_ENV_PATH, 'utf8');
	const lines = content.split(/\r?\n/);

	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (!line || line.startsWith('#')) continue;

		const separatorIndex = line.indexOf('=');
		if (separatorIndex < 1) continue;

		const key = line.slice(0, separatorIndex).trim();
		const value = line.slice(separatorIndex + 1).trim();

		if (!(key in process.env)) {
			process.env[key] = value;
		}
	}
}

export function getMongoConfig() {
	const uri = process.env.MONGODB_URI ?? '';
	const dbName = process.env.MONGODB_DB_NAME ?? 'globe_recipes';

	if (!uri) {
		throw new Error('Missing MONGODB_URI. Add it to the root .env file.');
	}

	return { uri, dbName };
}

export function getRecipesJsonSchema() {
	return {
		bsonType: 'object',
		required: [
			'title',
			'continent',
			'country',
			'description',
			'ingredients',
			'instructions',
			'cookingTime',
			'difficulty',
			'servings',
			'isUserCreated'
		],
		properties: {
			title: { bsonType: 'string', minLength: 1 },
			continent: { bsonType: 'string', minLength: 1 },
			country: { bsonType: 'string', minLength: 1 },
			description: { bsonType: 'string', minLength: 1 },
			ingredients: {
				bsonType: 'array',
				minItems: 1,
				items: { bsonType: 'string' }
			},
			instructions: {
				bsonType: 'array',
				minItems: 1,
				items: { bsonType: 'string' }
			},
			cookingTime: { bsonType: ['int', 'long', 'double', 'decimal'], minimum: 1 },
			difficulty: { enum: ['easy', 'medium', 'hard'] },
			servings: { bsonType: ['int', 'long', 'double', 'decimal'], minimum: 1 },
			isUserCreated: { bsonType: 'bool' },
			owner: { bsonType: ['string', 'null'] },
			legacyId: { bsonType: ['int', 'long', 'double', 'decimal'] },
			createdAt: { bsonType: 'date' },
			updatedAt: { bsonType: 'date' }
		}
	};
}

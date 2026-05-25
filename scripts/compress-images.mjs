import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('static');
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

async function walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const fullPath = path.join(dir, entry.name);
			return entry.isDirectory() ? walk(fullPath) : fullPath;
		})
	);
	return files.flat();
}

function optimizeBuffer(image, ext) {
	if (ext === '.png') {
		// Palette PNG gives large savings for most web assets with good visual quality.
		return image.png({
			palette: true,
			quality: 90,
			effort: 10,
			compressionLevel: 9
		});
	}

	if (ext === '.jpg' || ext === '.jpeg') {
		return image.jpeg({
			quality: 82,
			mozjpeg: true,
			chromaSubsampling: '4:4:4'
		});
	}

	if (ext === '.webp') {
		return image.webp({
			quality: 82,
			effort: 6
		});
	}

	return null;
}

async function main() {
	const allFiles = await walk(ROOT);
	const imageFiles = allFiles.filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()));

	let totalBefore = 0;
	let totalAfter = 0;
	let optimizedCount = 0;

	for (const file of imageFiles) {
		const ext = path.extname(file).toLowerCase();
		const input = await fs.readFile(file);
		totalBefore += input.length;

		const image = sharp(input, { failOn: 'none' });
		const optimized = optimizeBuffer(image, ext);

		if (!optimized) {
			totalAfter += input.length;
			continue;
		}

		const output = await optimized.toBuffer();

		if (output.length < input.length) {
			await fs.writeFile(file, output);
			totalAfter += output.length;
			optimizedCount += 1;
			console.log(`optimized: ${path.relative(process.cwd(), file)} ${input.length} -> ${output.length}`);
		} else {
			totalAfter += input.length;
			console.log(`skipped:   ${path.relative(process.cwd(), file)} (no gain)`);
		}
	}

	const saved = totalBefore - totalAfter;
	const percent = totalBefore > 0 ? (saved / totalBefore) * 100 : 0;

	console.log('\nDone.');
	console.log(`files checked: ${imageFiles.length}`);
	console.log(`files optimized: ${optimizedCount}`);
	console.log(`before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
	console.log(`after:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
	console.log(`saved:  ${(saved / 1024 / 1024).toFixed(2)} MB (${percent.toFixed(1)}%)`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});

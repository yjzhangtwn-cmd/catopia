import sharp, { type OutputInfo } from "sharp";
import { mkdirSync } from "node:fs";

const INPUT = "scripts/catopia.png";
const OUT_DIR = "public/images";

mkdirSync(OUT_DIR, { recursive: true });

const SIZES = [32, 64, 128, 256, 512, 1024] as const;

function label(path: string, info: OutputInfo) {
	const kb = (info.size / 1024).toFixed(1).padStart(8);
	console.log(`  ✓  ${path.padEnd(44)} ${kb} KB`);
}

console.log(`\nSource: ${INPUT}\n`);
console.log("── Size variants ──────────────────────────────────────────");

for (const size of SIZES) {
	const src = sharp(INPUT).resize(size, size);

	// WebP — best for modern browsers, supports transparency
	label(
		`${OUT_DIR}/catopia-${size}.webp`,
		await src.clone().webp({ quality: 85 }).toFile(`${OUT_DIR}/catopia-${size}.webp`),
	);

	// AVIF — better compression than WebP, broadly supported since 2023
	label(
		`${OUT_DIR}/catopia-${size}.avif`,
		await src.clone().avif({ quality: 70 }).toFile(`${OUT_DIR}/catopia-${size}.avif`),
	);

	// JPEG — universal fallback (flatten transparency to white)
	label(
		`${OUT_DIR}/catopia-${size}.jpg`,
		await src
			.clone()
			.flatten({ background: "#ffffff" })
			.jpeg({ quality: 85, mozjpeg: true })
			.toFile(`${OUT_DIR}/catopia-${size}.jpg`),
	);
}

console.log("\n── Web / PWA icons ────────────────────────────────────────");

// favicon.png — 32×32, replaces favicon.svg
label(
	"public/favicon.png",
	await sharp(INPUT).resize(32, 32).png({ compressionLevel: 9 }).toFile("public/favicon.png"),
);

// apple-touch-icon.png — 180×180, iOS home screen
label(
	"public/apple-touch-icon.png",
	await sharp(INPUT).resize(180, 180).png({ compressionLevel: 9 }).toFile("public/apple-touch-icon.png"),
);

console.log("\nDone.\n");

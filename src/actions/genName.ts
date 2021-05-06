import { v4 } from 'uuid';
import shortid from 'shortid';
import crypto from 'crypto';

function randBytes() {
	return crypto.randomBytes(16).toString('hex');
}

export async function genRandomName(file: File, sas: string) {
	const final_name =
		[v4(), shortid(), randBytes()].sort(() => 0.5 - Math.random()).join('/') +
		`/${~~(Date.now() / 1000)}` +
		`-${file.name}`;

	return final_name;
}

import fs from 'fs';
import { promisify } from 'util';
import { mkdirs as mkdirs_callback } from './mkdirs';

export const writeFile = promisify(fs.writeFile);
export const exists = promisify(fs.exists);
export const unlink = promisify(fs.unlink);
export const stat = promisify(fs.stat);
export const mkdirs = promisify(mkdirs_callback);

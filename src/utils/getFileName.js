import path from 'path';

export function getFileName(file){
	path.basename(file).split('.')[0];
}

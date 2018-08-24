import fs from 'fs';
import path from 'path';

// 递归创建目录 异步方法
export function mkdirs(dirname, callback) {
	fs.exists(dirname, function (exists) {
		if (exists) {
			callback();
		} else {
			mkdirs(path.dirname(dirname), function () {
				fs.mkdir(dirname, callback);
			});
		}
	});
}

// 递归创建目录 同步方法
export function mkdirsSync(dirname) {
	if (fs.existsSync(dirname)) {
		return true;
	} else {
		if (mkdirsSync(path.dirname(dirname))) {
			fs.mkdirSync(dirname);
			return true;
		}
	}
}

mkdirs('hello/a/b/c', () => {
	console.log('done');
})

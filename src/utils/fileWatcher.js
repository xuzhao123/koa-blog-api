import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { blogPath } from '../config';
import { BlogModel } from '../models/blog.model';
import { getFileName } from './getFileName';

async function add(filePath) {
	filePath = path.relative(blogPath, filePath);
	const blog = await BlogModel.getBlogByPath(filePath);

	if (blog.length == 0) {
		BlogModel.addBlog({
			title: getFileName(filePath),
			path: filePath
		});
	}
}

async function change(filePath) {
	filePath = path.relative(blogPath, filePath);
	await BlogModel.updateBlogByPath(filePath, {
		mtime: Date.now
	});
}

function addDir(path) {

}

function error(error) {

}

export function fileWatcher() {
	const watcher = chokidar.watch(blogPath, {
		ignored: /(^|[\/\\])\../,
		persistent: true
	});

	let status = '';
	let timeout;
	let renameArgs;
	watcher.on('unlink', (...args) => {
		status = 'unlink';
		renameArgs = args;
		timeout = setTimeout(() => {
			status = '';
			unlink(...args);
			renameArgs = null;
		}, 1000);
	})

	watcher.on('add', (...args) => {
		if (status === 'unlink') {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				status = '';
				rename(...renameArgs, ...args);
				renameArgs = null;
			}, 1000);
		} else {
			adds(...args);
		}
	})

	function unlink(path) {
		console.log(`File ${path} has been unlink`)
	}

	function rename(path, newPath) {
		console.log(`File ${path + newPath} has been rename`)
	}

	function adds(path) {
		console.log(`File ${path} has been adds`)
	}

	// watcher
	// 	.on('add', add)
	// 	.on('change', change)
	// 	.on('addDir', addDir)
	// 	.on('error', error)


	watcher
	// 	.on('add', path => console.log(`File ${path} has been added`))
	// 	.on('change', path => console.log(`File ${path} has been changed`))
	// 	.on('unlink', path => console.log(`File ${path} has been removed`))
	// 	.on('addDir', path => console.log(`Directory ${path} has been added`))
	// 	.on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
	// 	.on('error', error => console.log(`Watcher error: ${error}`))
	//	.on('ready', () => console.log('Initial scan complete. Ready for changes'))
	//.on('rename', (path) => console.log('rename', path))
	//.on('all', (event, path) => console.log(event, path))
	// 	.on('raw', (event, path, details) => {
	// 		log('Raw event info:', event, path, details);
	// 	});
}

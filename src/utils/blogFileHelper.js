import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { blogPath, env } from '../config';
import { stringifyTime } from './timeHelper';
import { exists, unlink, writeFile, stat, mkdirs } from './promisify';

const dirPath = path.resolve(blogPath);

function getBlogString(blog, category = blog.category, date = new Date()) {
	let tagString = '';
	if (blog.tags) {
		blog.tags.forEach(tag => {
			tagString += '- ' + tag + '\n';
		});
	}
	return `---
title: ${blog.title}
date: ${stringifyTime(date)}
category: ${category}
tags:
${tagString}
---
${blog.blog}
`;
}

export function publishBlog() {
	if (env === 'test') {
		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {
		exec('sh publish.sh', (error, stdout, stderr) => {
			console.log(`${stdout}`);
			console.log(`${stderr}`);
			if (error !== null) {
				console.log(`exec error: ${error}`);
			}
			resolve();
		});
	});
}

export async function addBlog(blog) {
	const filePath = path.resolve(dirPath, blog.title + '.md');

	await mkdirs(dirPath);
	await writeFile(filePath, getBlogString(blog));

	return publishBlog();
}

export async function updateBlog(oldBlog, newBlog) {
	if (oldBlog.title !== newBlog.title) {
		const oldFilePath = path.resolve(dirPath, oldBlog.title + '.md');
		await unlink(oldFilePath);
	}

	const filePath = path.resolve(dirPath, newBlog.title + '.md');
	await mkdirs(dirPath);
	await writeFile(filePath, getBlogString(newBlog, newBlog.category.name, newBlog.birthtime));

	return publishBlog();
}

export async function deleteBlog(blog) {
	const filePath = path.resolve(dirPath, blog.title + '.md');

	const isExist = await exists(filePath);
	if (isExist) {
		await unlink(filePath);
		return publishBlog();
	}
}

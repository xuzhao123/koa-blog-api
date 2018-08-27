import fs from 'fs';
import path from 'path';
import { blogPath } from '../config';
import { mkdirs } from './mkdirs';
import { stringifyTime } from './timeHelper';
import { exec } from 'child_process';

const dirPath = path.resolve(blogPath);

function getBlogString(blog, category = blog.category, date = new Date()) {
	return `---
title: ${blog.title}
date: ${stringifyTime(date)}
category: ${category}
tags:
---
${blog.blog}
`;
}

export function publishBlog() {
	return new Promise((resolve, reject) => {
		exec('ls && sh publish.sh', (error, stdout, stderr) => {
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
	await new Promise((resolve, reject) => {
		mkdirs(dirPath, () => {
			fs.writeFile(filePath, getBlogString(blog), (err) => {
				if (err) reject();
				resolve();
			});
		});
	});

	return publishBlog();
}

export async function updateBlog(oldBlog, newBlog) {
	const oldFilePath = path.resolve(dirPath, oldBlog.title + '.md');
	await new Promise((resolve, reject) => {
		fs.unlink(oldFilePath, (err) => {
			if (err) reject(err);
			resolve();
		});
	});

	const filePath = path.resolve(dirPath, newBlog.title + '.md');
	await new Promise((resolve, reject) => {
		mkdirs(dirPath, () => {
			fs.writeFile(filePath, getBlogString(newBlog, newBlog.category.name, newBlog.birthtime), (err) => {
				if (err) reject();
				resolve();
			});
		});
	});

	return publishBlog();
}

export async function deleteBlog(blog) {
	const filePath = path.resolve(dirPath, blog.title + '.md');
	await new Promise((resolve, reject) => {
		fs.unlink(filePath, (err) => {
			if (err) reject(err);
			resolve();
		});
	});

	return publishBlog();
}

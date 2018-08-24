import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { blogPath } from '../config';
import { mkdirs } from '../utils/mkdirs';

const { Schema } = mongoose;

const blogSchema = new Schema(
	{
		title: String,
		blog: String,
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category'
		},
		birthtime: {
			type: Date,
			default: Date.now
		},
		mtime: {
			type: Date,
			default: Date.now
		}
	}
);

// function blog(target, name, descriptor) {
// 	const oldValue = descriptor.value;
// 	descriptor.value = function(...args){
// 		const result = oldValue(...args);
// 		return result;
// 	};
// }

class BlogClass {

	/**
	 * 添加博客
	 * @param {*} blog
	 */
	//@blog
	static addBlog(blog) {
		return new BlogModel(blog).save();
	}

	/**
	 * 删除博客
	 * @param {*} id
	 */
	static deleteBlog(id) {
		return BlogModel.findByIdAndRemove(id);
	}

	/**
	 * 删除所有博客
	 */
	static async deleteBlogs() {
		const data = await BlogModel.find();
		return await BlogModel.remove({
			_id: {
				$in: data.map(d => {
					return d._id;
				})
			}
		});
	}

	/**
	 * 更新博客
	 * @param {string} id
	 * @param {*} blog
	 */
	static updateBlog(id, blog) {
		return BlogModel.findByIdAndUpdate(id, blog);
	}

	/**
	 * 通过path更新博客
	 * @param {string} path
	 * @param {*} blog
	 */
	static updateBlogByPath(path, blog) {
		return BlogModel
			.update(
				{ path },
				blog
			)
	}

	/**
	 * 获取博客
	 * @param {string} id
	 */
	static getBlogById(id) {
		return BlogModel
			.findById(id)
			.populate({
				path: 'category',
				select: 'name'
			});
	}

	static getBlogByPath(path) {
		return BlogModel
			.find({ path })
	}

	/**
	 * 获取博客
	 */
	static getBlogs(options = {}) {
		return BlogModel
			.find()
			.sort({
				birthtime: -1
			});
	}

	/**
	 * 获取最近的博客
	 */
	static getRecentBlogs() {
		return BlogModel.find()
			.select('_id title')
			.limit(10);
	}

	/**
	 * 通过分类获取博客
	 * @param {string} id
	 */
	static getBlogsByCategoryId(id) {
		let findOption;
		if (id) {
			findOption = {
				category: {
					$in: [id]
				}
			};
		}
		return BlogModel.find(findOption)
			.populate({
				path: 'category',
				select: 'name'
			})
			.select('title birthtime')
	}

	/**
	 * 导出博客
	 */
	static async exportMarkdown() {
		const data = await BlogModel
			.find()
			.populate({
				path: 'category',
				select: 'name'
			});
		return Promise.all(
			data.map(d => {
				const dirPath = path.resolve(blogPath, d.category.name)
				const filePath = path.resolve(dirPath, d.title + '.md')
				return new Promise(resolve => {
					mkdirs(dirPath, () => {
						fs.writeFile(filePath, d.blog, (err) => {
							resolve();
						});
					});
				});
			})
		)
	}
}

blogSchema.loadClass(BlogClass);

export const BlogModel = mongoose.model('Blog', blogSchema);

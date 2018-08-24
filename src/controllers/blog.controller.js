import { BlogModel } from '../models/blog.model';
import { type } from '../utils/typeDecorator';

export class BlogController {

	/**
	 * 添加博客
	 * @param {*} ctx
	 */
	@type('post')
	static async add(ctx) {
		try {
			await BlogModel.addBlog(ctx.request.body);
			ctx.status = 200;
			ctx.body = {
				message: '操作成功'
			};
		} catch (err) {
			ctx.throw(422);
		}
	}

	/**
	 * 删除博客
	 * @param {*} ctx
	 */
	@type('delete')
	static async delete(ctx) {
		try {
			const { id } = ctx.query;
			const blog = await BlogModel.deleteBlog(id);

			if (!blog) {
				ctx.throw(404);
			}
			ctx.status = 200;
			ctx.body = {
				message: '操作成功'
			};
		} catch (err) {
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.throw(404);
			}
			ctx.throw(500);
		}
	}

	/**
	 * 删除所有博客
	 * @param {c} ctx
	 */
	@type('get')
	static async deleteAll(ctx) {
		try {
			await BlogModel.deleteBlogs();
			ctx.status = 200;
			ctx.body = {
				message: '操作成功'
			};
		} catch (err) {
			console.log(err);
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.throw(404);
			}
			ctx.throw(500);
		}
	}

	/**
	 * 更新博客
	 * @param {*} ctx
	 */
	@type('put')
	static async update(ctx) {
		try {
			const { body } = ctx.request;
			const { id } = ctx.query;
			await BlogModel.updateBlog(id, body);
			ctx.status = 200;
			ctx.body = {
				message: '操作成功'
			};
		} catch (err) {
			ctx.throw(400);
		}
	}

	/**
	 * 获取博客
	 * @param {*} ctx
	 */
	@type('get')
	static async get(ctx) {
		try {
			const { id } = ctx.query;
			const data = await BlogModel.getBlogById(id);
			ctx.status = 200;
			ctx.body = {
				data: data
			};
		} catch (err) {
			ctx.throw(404);
		}
	}

	/**
	 * 获取博客列表 TOTO分页
	 * @param {*} ctx
	 */
	@type('get')
	static async list(ctx) {
		const data = await BlogModel.getBlogs();
		ctx.status = 200;
		ctx.body = {
			data: data
		};
	}

	/**
	 * 获取最新博客列表
	 * @param {*} ctx
	 */
	@type('get')
	static async getRecentBlogs(ctx) {
		const data = await BlogModel.getRecentBlogs();
		ctx.status = 200;
		ctx.body = {
			data: data
		};
	}

	/**
	 * 根据分类获取博客列表
	 * @param {*} ctx
	 */
	@type('get')
	static async getBlogsByCategoryId(ctx) {
		const { id } = ctx.query;
		const data = await BlogModel.getBlogsByCategoryId(id);
		ctx.status = 200;
		ctx.body = {
			data: data
		};
	}

	@type('get')
	static async exportMarkdown(ctx) {
		await BlogModel.exportMarkdown();
		ctx.status = 200;
		ctx.body = {
			message: '操作成功'
		};
	}
}

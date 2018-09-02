import { BlogModel } from '../models/blog.model';
import { methodDecorator, urlDecorator } from '../utils/decorator';
import { errorHandle } from '../utils/errorHandle';

export class BlogController {

	/**
	 * 删除所有博客
	 * @param {c} ctx
	 */
	@methodDecorator('get')
	@urlDecorator('/deleteAll')
	static async deleteAll(ctx) {
		try {
			await BlogModel.deleteBlogs();
			ctx.status = 200;
			ctx.body = {
				message: '操作成功'
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}

	/**
	 * 获取最新博客列表
	 * @param {*} ctx
	 */
	@methodDecorator('get')
	@urlDecorator('/getRecentBlogs')
	static async getRecentBlogs(ctx) {
		try {
			const data = await BlogModel.getRecentBlogs();
			ctx.status = 200;
			ctx.body = {
				data: data
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}

	/**
	 * 根据分类获取博客列表
	 * @param {*} ctx
	 */
	@methodDecorator('get')
	@urlDecorator('/getBlogsByCategoryId/:id')
	static async getBlogsByCategoryId(ctx) {
		try {
			const { id } = ctx.params;
			const data = await BlogModel.getBlogsByCategoryId(id);
			ctx.status = 200;
			ctx.body = {
				data: data
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}

	@methodDecorator('get')
	@urlDecorator('/exportMarkdown')
	static async exportMarkdown(ctx) {
		try {
			await BlogModel.exportMarkdown();
			ctx.status = 200;
			ctx.body = {
				message: '操作成功'
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}

	/**
	 * 添加博客
	 * @param {*} ctx
	 * body:{
	 * 	title,
	 *  blog,
	 *  category
	 * }
	 */
	@methodDecorator('post')
	@urlDecorator('/')
	static async add(ctx) {
		try {
			const data = await BlogModel.addBlog(ctx.request.body);
			ctx.status = 200;
			ctx.body = {
				data,
				message: '操作成功'
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}

	/**
	 * 删除博客
	 * @param {*} ctx
	 */
	@methodDecorator('delete')
	@urlDecorator('/:id')
	static async delete(ctx) {
		try {
			const { id } = ctx.params;
			const blog = await BlogModel.deleteBlog(id);
			if (!blog) {
				ctx.throw(404);
			}
			ctx.status = 200;
			ctx.body = {
				message: '操作成功'
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}

	/**
	 * 更新博客
	 * @param {*} ctx
	 */
	@methodDecorator('put')
	@urlDecorator('/:id')
	static async update(ctx) {
		try {
			const { body } = ctx.request;
			const { id } = ctx.params;
			const data = await BlogModel.updateBlog(id, body);
			ctx.status = 200;
			ctx.body = {
				data,
				message: '操作成功'
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}

	/**
	 * 获取博客
	 * @param {*} ctx
	 */
	@methodDecorator('get')
	@urlDecorator('/:id')
	static async get(ctx) {
		try {
			const { id } = ctx.params;
			const data = await BlogModel.getBlogById(id);
			ctx.status = 200;
			ctx.body = {
				data: data
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}

	/**
	 * 获取博客列表 TOTO分页
	 * @param {*} ctx
	 */
	@methodDecorator('get')
	@urlDecorator('/')
	static async list(ctx) {
		try {
			const data = await BlogModel.getBlogs();
			ctx.status = 200;
			ctx.body = {
				data: data
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}
}

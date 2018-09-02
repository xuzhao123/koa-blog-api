import { CategoryModel } from '../models/category.model';
import { methodDecorator, urlDecorator } from '../utils/decorator';
import { errorHandle } from '../utils/errorHandle';

export class CategoryController {

	/**
	 * 删除所有分类
	 * @param {*} ctx
	 */
	@methodDecorator('get')
	@urlDecorator('/deleteAll')
	static async deleteAll(ctx) {
		try {
			const data = await CategoryModel.find();
			await CategoryModel.remove({
				_id: {
					$in: data.map(d => {
						return d._id;
					})
				}
			});
			ctx.status = 200;
			ctx.body = {
				message: '操作成功'
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}

	/**
	 * 添加分类
	 * @param {*} ctx
	 * body:{
	 * 	name
	 * }
	 */
	@methodDecorator('post')
	@urlDecorator('/')
	static async add(ctx) {
		try {
			const data = await new CategoryModel(ctx.request.body).save();
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
	 * 删除分类
	 * @param {*} ctx
	 */
	@methodDecorator('delete')
	@urlDecorator('/:id')
	static async delete(ctx) {
		try {
			const id = ctx.params.id;
			const data = await CategoryModel.findByIdAndRemove(id);
			if (!data) {
				ctx.throw(404);
			}
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
	 * 更新分类
	 * @param {*} ctx
	 */
	@methodDecorator('put')
	@urlDecorator('/:id')
	static async update(ctx) {
		try {
			const { body } = ctx.request;
			const { id } = ctx.params;
			const data = await CategoryModel.findByIdAndUpdate(id, body);
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
	 * 获取分类
	 * @param {*} ctx
	 */
	@methodDecorator('get')
	@urlDecorator('/:id')
	static async get(ctx) {
		try {
			const { id } = ctx.params;
			const data = await CategoryModel.findById(id);
			ctx.status = 200;
			ctx.body = {
				data: data
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}

	/**
	 * 获取所有分类列表
	 * @param {*} ctx
	 */
	@methodDecorator('get')
	@urlDecorator('/')
	static async list(ctx) {
		try {
			const data = await CategoryModel.find();
			ctx.status = 200;
			ctx.body = {
				data: data
			};
		} catch (err) {
			errorHandle(ctx, err);
		}
	}
}

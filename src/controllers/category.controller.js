import { CategoryModel } from '../models/category.model';
import { type } from '../utils/typeDecorator';

export class CategoryController {

	@type('get')
	static async list(ctx) {
		const data = await CategoryModel.find();
		ctx.status = 200;
		ctx.body = {
			data: data
		};
	}

	@type('post')
	static async add(ctx) {
		try {
			const category = await new CategoryModel(ctx.request.body).save();
			ctx.status = 200;
			ctx.body = {
				data: category,
				message: '操作成功'
			};
		} catch (err) {
			console.log(err);
			ctx.throw(422);
		}
	}

	@type('delete')
	static async remove(ctx) {
		try {
			const id = ctx.params.id;
			const blog = await CategoryModel.findByIdAndRemove(id);
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

	@type('get')
	static async removeAll(ctx) {
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
			console.log(err);
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.throw(404);
			}
			ctx.throw(500);
		}
	}

	@type('put')
	static async update(ctx) {
		try {
			ctx.body = 'update';
		} catch (err) {
			ctx.throw(404);
		}
	}

	@type('get')
	static async get(ctx) {
		try {
			const { id } = ctx.query;
			const data = await CategoryModel.findById(id);
			ctx.status = 200;
			ctx.body = {
				data: data
			};
		} catch (err) {
			ctx.throw(404);
		}
	}
}

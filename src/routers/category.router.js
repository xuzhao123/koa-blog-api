import Router from 'koa-router';
import { CategoryController } from '../controllers/category.controller';

const categoryRouter = new Router({
	prefix: '/category'
});

for (let key in CategoryController) {
	const api = CategoryController[key];
	categoryRouter[api.type](`/${key}`, api);
}

export { categoryRouter }


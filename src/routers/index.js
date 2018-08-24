import Router from 'koa-router';

import { blogRouter } from './blog.router';
import { categoryRouter } from './category.router';
import { routePrefix } from '../config';

export function routing(app) {
	let router = new Router({
		prefix: routePrefix
	});

	router.use(blogRouter.routes(), blogRouter.allowedMethods());
	router.use(categoryRouter.routes(), categoryRouter.allowedMethods());

	app.use(router.routes()).use(router.allowedMethods());
}

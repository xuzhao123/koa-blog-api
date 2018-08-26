import Router from 'koa-router';
import { BlogController } from '../controllers/blog.controller';

const blogRouter = new Router({
	prefix: '/blog'
});

for (var key in BlogController) {
	const api = BlogController[key];
	blogRouter[api.method](`${api.url}`, api);
}

export { blogRouter }


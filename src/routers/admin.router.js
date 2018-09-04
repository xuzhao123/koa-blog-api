import Router from 'koa-router';
import { AdminController } from '../controllers/admin.controller';

const adminRouter = new Router({
	prefix: '/admin'
});

for (let key in AdminController) {
	const api = AdminController[key];
	adminRouter[api.method](`${api.url}`, api);
}

export { adminRouter }


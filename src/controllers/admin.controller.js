import jsonwebtoken from 'jsonwebtoken'

import { methodDecorator, urlDecorator } from '../utils/decorator';
import { errorHandle } from '../utils/errorHandle';
import { secret, env, jwtTimeout } from '../config';


export class AdminController {

	@methodDecorator('post')
	@urlDecorator('/login')
	static async login(ctx) {
		try {
			const { body } = ctx.request;
			if (body.username === 'xuzhao' && body.password === 'xuzhao' || env === 'test') {
				ctx.status = 200;
				ctx.body = {
					message: '登录成功',
					data: {
						expires: +new Date() + jwtTimeout * 1000,
						token: jsonwebtoken.sign({
							data: body.username
						}, secret, { expiresIn: jwtTimeout })
					}
				};
			} else {
				ctx.status = 401;
				ctx.body = {
					error: '登录失败',
				};
			}
		} catch (err) {
			errorHandle(ctx, err);
		}
	}
}

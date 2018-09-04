import jsonwebtoken from 'jsonwebtoken'

import { methodDecorator, urlDecorator } from '../utils/decorator';
import { errorHandle } from '../utils/errorHandle';
import { secret, env } from '../config';


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
						token: jsonwebtoken.sign({
							data: body.username
						}, secret, { expiresIn: 60 * 60 })
					}
				};
			} else {
				ctx.status = 200;
				ctx.body = {
					error: '登录失败',
				};
			}
		} catch (err) {
			errorHandle(ctx, err);
		}
	}
}

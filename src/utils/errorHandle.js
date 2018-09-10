export default function formatErrors(obj) {
	const errors = {}
	Object.keys(obj).forEach((i) => {
		if (obj[i]) {
			errors[obj[i].path] = obj[i].message
		}
	})
	return errors
}

export function errorHandle(ctx, error) {
	if (error.name === 'MongoError' && error.code === 11000) {
		ctx.status = 400;
		ctx.body = {
			message: error.message,
		};
		return;
	}

	if (error.name === 'CastError' || error.name === 'NotFoundError') {
		ctx.status = 404;
		ctx.body = {
			message: error.message,
		};
		return;
	}

	if (error.errors) {
		ctx.status = 400;
		ctx.body = {
			error: formatErrors(error.errors),
		};
		return;
	}

	ctx.status = 500;
	ctx.body = {
		error: '服务器内部错误',
		error_message: error
	};
}

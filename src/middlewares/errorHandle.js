export async function errorHandle(ctx, next) {
	try {
		await next();
	} catch (err) {
		console.log(err.message);
		ctx.response.status = err.statusCode || err.status || 500;
		ctx.response.body = {
			message: err.message
		};
	}
}

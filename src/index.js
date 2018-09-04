import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import jwt from 'koa-jwt';
import mongoose from 'mongoose';

import { port, publicPath, connectionString, secret } from './config';
import { routing } from './routers';
import { errorHandle } from './middlewares/errorHandle';

mongoose.connect(connectionString);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error);

const app = new Koa();

app
	.use(errorHandle)
	.use(jwt({
		secret,
	}).unless({
		path: publicPath,
		method: ['GET']
	}))
	.use(bodyParser())
	.use(logger())
	.use(helmet())

routing(app);

const server = app.listen(port, () => {
	console.log(`running on port ${port}`);
});

export { server }

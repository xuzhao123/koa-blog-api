import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import mongoose from 'mongoose';

import { port } from './config';
import { routing } from './routers';
import { errorHandle } from './middlewares/errorHandle';

import { connectionString } from './config';

mongoose.connect(connectionString);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error);

const app = new Koa();

app
	.use(errorHandle)
	.use(bodyParser())
	.use(logger())

routing(app);

app.listen(port, () => {
	console.log(`running on port ${port}`);
});

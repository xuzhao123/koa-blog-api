import path from 'path';

export const port = process.env.PORT || 5000;
export const routePrefix = '/api/v1';
export const connectionString = 'mongodb://127.0.0.1/blog';
export const blogPath = path.resolve('../hexo-blog/source/_posts');
export const env = process.env.NODE_ENV;
export const secret = 'jwt secret';
export const publicPath = [
	/register/,
	/login/
]

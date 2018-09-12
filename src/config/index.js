import path from 'path';

export const port = process.env.PORT || 5000;
export const routePrefix = '/api/v1';
export const connectionString = 'mongodb://xuzhao:xuzhao@140.143.170.28/blog';
export const blogPath = path.resolve('../hexo-blog/source/_posts');
export const env = process.env.NODE_ENV;
export const secret = 'jwt secret';
export const jwtTimeout = 3600; // 超时时间，一个小时
export const publicPath = [
	/register/,
	/login/
];

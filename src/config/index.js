import path from 'path';

export const port = process.env.PORT || 5000;
export const routePrefix = '/api/v1';
export const connectionString = 'mongodb://140.143.170.28/blog';
export const blogPath = path.resolve('../blogs');
export const env = process.env.NODE_ENV;

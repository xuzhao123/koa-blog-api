import supertest from 'supertest';
import { server } from '../src';
import { routePrefix } from '../src/config';

const request = supertest.agent(server);

const temp = {};
const category = 'category';
const blog = 'blog';

function asyncDone(cb) {
	setTimeout(function () {
		cb();
	}, 3000)
}

describe('api', () => {
	describe('category', () => {

		it('list', async () => {
			await request
				.get(`${routePrefix}/${category}/category`)
				.set('Accept', 'application/json')
				.expect(200);
		});

		it('add', async () => {
			await request
				.post(`${routePrefix}/${category}/category`)
				.set('Accept', 'application/json')
				.send({
					name: '分类' + +new Date(),
				})
				.expect(200)
				.then(res => {
					temp.categoryId = res.body.data._id;
				});
		});

		it('update', async () => {
			await request
				.put(`${routePrefix}/${category}/category/${temp.categoryId}`)
				.set('Accept', 'application/json')
				.send({
					name: '分类' + +new Date(),
				})
				.expect(200);
		});

		it('get', async () => {
			await request
				.get(`${routePrefix}/${category}/category/${temp.categoryId}`)
				.set('Accept', 'application/json')
				.expect(200);
		});

		it('delete', async () => {
			await request
				.delete(`${routePrefix}/${category}/category/${temp.categoryId}`)
				.set('Accept', 'application/json')
				.expect(200);
		});
	});

	describe('blog', () => {
		it('list', async () => {
			await request
				.get(`${routePrefix}/${blog}/blog`)
				.set('Accept', 'application/json')
				.expect(200);
		});

		it('add', async (done) => {
			await request
				.post(`${routePrefix}/${category}/category`)
				.set('Accept', 'application/json')
				.send({
					name: '分类' + +new Date(),
				})
				.expect(200)
				.then(res => {
					temp.categoryId = res.body.data._id;
				});

			await request
				.post(`${routePrefix}/${blog}/blog`)
				.set('Accept', 'application/json')
				.send({
					title: '测试',
					blog: '测试',
					category: temp.categoryId
				})
				.expect(200)
				.then(res => {
					temp.blogId = res.body.data._id;
					asyncDone(done)
				})
		});

		it('update', async (done) => {
			await request
				.put(`${routePrefix}/${blog}/blog/${temp.blogId}`)
				.set('Accept', 'application/json')
				.send({
					title: '测试update',
					blog: '测试update',
				})
				.expect(200)
				.then(res => {
					asyncDone(done);
				})
		});

		it('get', async () => {
			await request
				.get(`${routePrefix}/${blog}/blog/${temp.blogId}`)
				.set('Accept', 'application/json')
				.expect(200);
		});

		it('delete', async () => {
			await request
				.delete(`${routePrefix}/${blog}/blog/${temp.blogId}`)
				.set('Accept', 'application/json')
				.expect(200);
		});

		it('getRecentBlogs', async () => {
			await request
				.get(`${routePrefix}/blog/getRecentBlogs`)
				.set('Accept', 'application/json')
				.expect(200);
		});

		it('getBlogsByCategoryId', async () => {
			await request
				.get(`${routePrefix}/blog/getBlogsByCategoryId/${temp.categoryId}`)
				.set('Accept', 'application/json')
				.expect(200);
		});
	});
});

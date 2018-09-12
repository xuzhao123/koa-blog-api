import { CategoryModel } from "../models/category.model";
import { addBlog, updateBlog, deleteBlog } from "./blogFileHelper";
import { BlogModel } from "../models/blog.model";
import { env } from "../config";

/**
 * 修饰器：给方法添加type属性
 * @param {string} type
 */
export function methodDecorator(method) {
	return (target, property, descriptor) => {
		target[property].method = method;
		descriptor.enumerable = true;
	}
}

export function urlDecorator(url) {
	return (target, property, descriptor) => {
		target[property].url = url;
		descriptor.enumerable = true;
	}
}

const blogHandle = {
	add: (target, property, descriptor) => {
		const oldValue = descriptor.value;
		descriptor.value = async function (blog) {
			if (blog.publish) {
				setTimeout(async () => {
					const category = await CategoryModel.findById(blog.category);
					blog.category = category.name;
					addBlog(blog);
				});
			}
			return oldValue.call(this, blog);
		};

		return descriptor;
	},

	update: (target, property, descriptor) => {
		const oldValue = descriptor.value;
		descriptor.value = async function (id, blog) {
			if (blog.publish) {
				const oldBlog = await BlogModel.getBlogById(id);
				setTimeout(async () => {
					const newBlog = await BlogModel.getBlogById(id);
					updateBlog(oldBlog, newBlog);
				});
			}
			return oldValue.call(this, id, blog);
		};
		return descriptor;
	},

	delete: (target, property, descriptor) => {
		const oldValue = descriptor.value;
		descriptor.value = async function (id) {
			// 多了一层查找操作 TODO fix
			const blog = await BlogModel.findById(id);
			setTimeout(async () => {
				deleteBlog(blog);
			});
			return oldValue.call(this, id);
		};

		return descriptor;
	},

	noop: (target, property, descriptor) => {
		return descriptor;
	}
}

export function blogDecorator(method) {
	return blogHandle[method];
}

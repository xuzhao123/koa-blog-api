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

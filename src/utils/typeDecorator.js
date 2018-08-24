/**
 * 修饰器：给方法添加type属性
 * @param {string} type
 */
export function type(type) {
	return (target, property, descriptor) => {
		target[property].type = type;
		descriptor.enumerable = true;
	}
}

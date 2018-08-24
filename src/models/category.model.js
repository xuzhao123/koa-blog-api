import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		createTime: {
			type: Date,
			default: Date.now(),
		},
		updateTime: {
			type: Date,
			default: Date.now(),
		},
	}
);

export const CategoryModel = mongoose.model('Category', categorySchema);

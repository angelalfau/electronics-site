import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BankSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// module.exports = mongoose.model("Bank", BankSchema);
export default mongoose.model("Bank", BankSchema);

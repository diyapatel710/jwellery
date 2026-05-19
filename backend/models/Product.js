import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: String,
    category: { type: String, required: true },
    metal: { type: String, required: true },
    karat: String,
    weight: Number,
    price: { type: Number, required: true },
    mrp: Number,
    images: [String],
    stock: { type: Number, default: 0 },
    sku: { type: String, unique: true },
    badge: String,
    sizes: [String],
    specs: [{ key: String, value: String }],
    tags: [String],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    salesCount: { type: Number, default: 0 },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

export default Product;
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";

import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import Review from "./models/Review.js";
import ProductReview from "./models/ProductReview.js";
import UserReview from "./models/UserReview.js";
import Coupon from "./models/coupon.js";
import Category from "./models/Category.js";
import Cart from "./models/Cart.js";
import Booking from "./models/Booking.js";

dotenv.config();

// CONNECT DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// LOAD JSON FILES
const users = JSON.parse(
    fs.readFileSync("./seeder/data/users.json", "utf-8")
);

const products = JSON.parse(
    fs.readFileSync("./seeder/data/products.json", "utf-8")
);

const orders = JSON.parse(
    fs.readFileSync("./seeder/data/orders.json", "utf-8")
);

const reviews = JSON.parse(
    fs.readFileSync("./seeder/data/reviews.json", "utf-8")
);

const productReviews = JSON.parse(
    fs.readFileSync("./seeder/data/productreviews.json", "utf-8")
);

const userReviews = JSON.parse(
    fs.readFileSync("./seeder/data/userreviews.json", "utf-8")
);

const coupons = JSON.parse(
    fs.readFileSync("./seeder/data/coupons.json", "utf-8")
);

const categories = JSON.parse(
    fs.readFileSync("./seeder/data/categories.json", "utf-8")
);

const carts = JSON.parse(
    fs.readFileSync("./seeder/data/carts.json", "utf-8")
);

const bookings = JSON.parse(
    fs.readFileSync("./seeder/data/bookings.json", "utf-8")
);

// CLEAN MONGO EXPORT DATA
const cleanMongoData = (data) => {
    return data.map((item) => {

        // REMOVE IDS
        delete item._id;
        delete item.__v;

        // FIX DATES
        if (item.createdAt?.$date) {
            item.createdAt = item.createdAt.$date;
        }

        if (item.updatedAt?.$date) {
            item.updatedAt = item.updatedAt.$date;
        }

        if (item.date?.$date) {
            item.date = item.date.$date;
        }

        if (item.deliveredAt?.$date) {
            item.deliveredAt = item.deliveredAt.$date;
        }

        if (item.expiry?.$date) {
            item.expiry = item.expiry.$date;
        }

        // FIX OBJECT IDS
        if (item.productId?.$oid) {
            item.productId = item.productId.$oid;
        }

        if (item.orderId?.$oid) {
            item.orderId = item.orderId.$oid;
        }

        if (item.userId?.$oid) {
            item.userId = item.userId.$oid;
        }

        if (item.user?.$oid) {
            item.user = item.user.$oid;
        }

        // FIX ITEMS PRODUCT IDS
        if (item.items && Array.isArray(item.items)) {
            item.items = item.items.map((product) => {

                if (product.product?.$oid) {
                    product.product = product.product.$oid;
                }

                return product;
            });
        }

        // REMOVE ADDRESS IDS
        if (item.addresses && Array.isArray(item.addresses)) {
            item.addresses = item.addresses.map((address) => {
                delete address._id;
                return address;
            });
        }

        return item;
    });
};

// IMPORT DATA
const importData = async () => {
    try {

        // DELETE OLD DATA
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        await Review.deleteMany();
        await ProductReview.deleteMany();
        await UserReview.deleteMany();
        await Coupon.deleteMany();
        await Category.deleteMany();
        await Cart.deleteMany();
        await Booking.deleteMany();

        console.log("Old Data Deleted");

        // INSERT DATA
        await User.insertMany(
            cleanMongoData(users)
        );

        await Product.insertMany(
            cleanMongoData(products)
        );

        await Order.insertMany(
            cleanMongoData(orders)
        );

        await Review.insertMany(
            cleanMongoData(reviews)
        );

        await ProductReview.insertMany(
            cleanMongoData(productReviews)
        );

        await UserReview.insertMany(
            cleanMongoData(userReviews)
        );

        await Coupon.insertMany(
            cleanMongoData(coupons)
        );

        await Category.insertMany(
            cleanMongoData(categories)
        );

        await Cart.insertMany(
            cleanMongoData(carts)
        );

        await Booking.insertMany(
            cleanMongoData(bookings)
        );

        console.log("Database Seeded Successfully");

        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

importData();
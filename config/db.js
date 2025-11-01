import mongoose from 'mongoose';

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (err) {
        console.log(`Error messae:${err.message}`.red);
        process.exit(1);
    }
    
}


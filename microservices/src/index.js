const express = require('express');
const { createClient } = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379'
});

redisClient.on('error', err => console.error('Redis Client Error', err));

async function start() {
    await redisClient.connect();
    console.log('Connected to Redis');

    // Simple subscriber for notifications
    const subscriber = redisClient.duplicate();
    await subscriber.connect();

    await subscriber.subscribe('notifications', (message) => {
        console.log('Received notification task:', message);
        // Here we would send email via Nodemailer
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Notification service listening on port ${port}`);
    });
}

start().catch(err => console.error(err));

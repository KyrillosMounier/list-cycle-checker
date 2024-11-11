import * as dotenv from 'dotenv';


 dotenv.config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    // dataset length for json array for list inputs
    jsonLenghtThreshold :  parseInt(process.env.JSON_LENGTH_THRESHOLD, 10) || 10,
    rmqUrl: process.env.RMQ_URL || 'amqp://localhost:5672',
    queueName:  process.env.QUEUE_NAME || 'prefect_cycle'
}

export default config
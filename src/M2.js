const amqp = require("amqplib");
const logger = require("pino")();

const QUEUE_NAME = "task_queue";
const AMQP_URL =
  "amqps://cpdioxca:XRP2UjHwM7dCHlg6IyXKT4IqQNAFMt2l@mustang.rmq.cloudamqp.com/cpdioxca";

async function processTask(task) {
  logger.info("Processing task:", task);
  const result = "Task processed successfully";
  return result;
}

async function startConsumingTasks() {
  try {
    const connection = await amqp.connect(AMQP_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.prefetch(1);

    logger.info("Микросервис М2 ожидает заданий из очереди...");

    channel.consume(
      QUEUE_NAME,
      async (message) => {
        const task = JSON.parse(message.content.toString());

        const result = await processTask(task);

        channel.sendToQueue(
          message.properties.replyTo,
          Buffer.from(result.toString()),
          {
            correlationId: message.properties.correlationId,
          }
        );

        channel.ack(message);
      },
      { noAck: false }
    );
  } catch (error) {
    logger.error("Error consuming tasks from queue:", error);
  }
}

startConsumingTasks();

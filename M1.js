const express = require("express");
const bodyParser = require("body-parser");
const amqp = require("amqplib");
const logger = require("pino")();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const QUEUE_NAME = "task_queue";
const AMQP_URL =
  "amqps://cpdioxca:XRP2UjHwM7dCHlg6IyXKT4IqQNAFMt2l@mustang.rmq.cloudamqp.com/cpdioxca";

async function sendTaskToQueue(task) {
  try {
    const connection = await amqp.connect(AMQP_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    logger.info("Task sent to the queue:", task);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(task)), {
      persistent: true,
    });

    await channel.close();
    await connection.close();
  } catch (error) {
    logger.error("Error sending task to queue:", error);
  }
}

app.post("/process", (req, res) => {
  const data = req.body;

  sendTaskToQueue(data);

  res.json({ status: "Processing started" });
});

app.listen(PORT, () => {
  logger.info(`Микросервис М1 запущен на порту ${PORT}`);
});

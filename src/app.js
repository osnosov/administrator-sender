import 'dotenv/config'

import { consume } from './services/amqpConsume.js'
import callTelegramMethod from './services/telegram.js'

import Logger from './services/logger.js'
const logger = Logger(import.meta.url)

export const app = async () => {
  const consumeEmmitter = await consume()

  consumeEmmitter.on('data', async (message, ack) => {
    const { pattern, data } = JSON.parse(message)

    if (pattern === 'telegram') {
      callTelegramMethod(data.token, data.method, data.payload)
    } else {
      logger.error(`Pattern '${pattern}' is not supported`)
    }
    ack()
  })
}

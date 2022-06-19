import 'dotenv/config'

import { consume } from './services/amqpConsume.js'

import Logger from './services/logger.js'
const logger = Logger(import.meta.url)

export const app = async () => {
  const consumeEmmitter = await consume()
  consumeEmmitter.on('data', (message, ack) => {
    const msg = JSON.parse(message)
    logger.info(msg)
    ack()
  })
}

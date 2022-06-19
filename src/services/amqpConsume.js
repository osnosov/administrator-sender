import { connect } from 'amqp-connection-manager'
import EventEmitter from 'events'

import Logger from './logger.js'
const logger = Logger(import.meta.url)

const connection = connect(process.env.AMQP_HOST)
connection.on('connect', () => logger.info('Connected to AMQP consume'))
connection.on('disconnect', err => logger.error('Disconnected from AMQP consume', err))

const channel = connection.createChannel({
  json: false,
  setup: async channel => {
    return await Promise.all([
      channel.assertQueue(process.env.QUEUE_SENDER, { durable: true }),
      channel.prefetch(1)
    ])
  }
})

const consume = async () => {
  const consumeEmitter = new EventEmitter()
  channel.consume(process.env.QUEUE_SENDER, message => {
    consumeEmitter.emit('data', message.content.toString(), () => {
      channel.ack(message)
    })
  })
  return consumeEmitter
}

export { connection, channel, consume }

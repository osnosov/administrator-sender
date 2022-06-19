import pino from 'pino'
import path from 'path'
import { fileURLToPath } from 'url'

const ENV = process.env.NODE_ENV?.toLowerCase() || 'production'
const logLevel = ENV == 'production' ? 'warn' : process.env.LOGGER_LEVEL || 'trace'
// Accepts a number, trace, debug, info, warn, error, or fatal

const logger = fileName =>
  pino({
    transport: {
      target: 'pino-pretty',
      options: {
        minimumLevel: logLevel,
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss.l',
        messageFormat: '{filename}: {msg}',
        ignore: 'pid,hostname,filename'
      }
    }
  }).child({ filename: path.relative('./', fileURLToPath(fileName)) })

export default logger

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

/**
 * @description 时间格式化函数，偏移8小时
 * @param {string} UTCTime
 * @param {string} format
 * @returns {string} formatTime
 */
export default function formatUTC(UTCTime: string, format: string = 'YYYY/MM/DD HH:mm:ss') {
  const formatTime = dayjs.utc(UTCTime).utcOffset(8).format(format)
  return formatTime
}

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default function formatUTC(UTCTime: string) {
  const formatTime = dayjs.utc(UTCTime).format('YYYY/MM/DD HH:mm:ss')
  return formatTime
}

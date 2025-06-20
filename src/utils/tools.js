import dayjs from 'dayjs'
export const formatDate=(t,format='YYYY-MM-DD HH:mm:ss')=>{
    return dayjs(t?t:new Date()).format(format)
}
import dayjs from 'dayjs';

export default {
   backendUrl: 'http://localhost:3333',
   crypto: 'secretpassforencrypt',
   saveCookie: new Date(dayjs().add(100, 'year').format()).toUTCString(),
   deleteCookie: 'Thu, 01 Jan 1970 00:00:00 GMT',
};

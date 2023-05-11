
import { createHmac } from 'crypto';

/** Print to console. easier to write than stupid `console.log`*/
export function print(...args) {
  console.log(args);
}

export function ms_to_min(ms: number) {
	return ms / 1000 / 60;
}

/** More readable than Math.max(). This is different than Math.floor() btw! */
export function floor(num: number, floor: number) {
  return Math.max(num, floor);
}



export function minute_hash(key, offset) {
  return createHmac('md5', (Math.floor(ms_to_min(new Date().getTime())) + offset).toString()).update(key).digest('base64')
}

export function minute_hash_absolute(key, date: Date) {
  return createHmac('md5', (Math.floor(ms_to_min(date.getTime()))).toString()).update(key).digest('base64')
}
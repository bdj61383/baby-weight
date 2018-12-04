import * as Timestamp from 'firebase-firestore-timestamp';

export function dateToTimestamp(date: Date): any {
  return new Timestamp(Math.floor(date.getTime() / 1000), 0); // We don't care enough about exactness to bother with milliseconds after epoch.
}

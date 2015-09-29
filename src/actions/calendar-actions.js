export const CHANGE_DAY = 'CHANGE_DAY';
export function changeDay(time) {
  return {
    type: CHANGE_DAY,
    time: time
  }
}

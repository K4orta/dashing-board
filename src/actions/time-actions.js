export const MINUTE_TICK = 'MINUTE_TICK';
export function minuteTick(time) {
  return {
    type: MINUTE_TICK,
    time: time
  }
}
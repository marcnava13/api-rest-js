export function sleep(interval: number = 3000) {
  return new Promise((resolve) => setTimeout(resolve, interval));
}

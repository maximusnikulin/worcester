// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function getEnv() {
  return {
    ...process.env,
    IS_TEST: process.env.NODE_ENV === 'test',
  }
}

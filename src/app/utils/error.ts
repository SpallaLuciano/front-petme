export class RequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function handleError(anything: unknown) {
  const log = `${new Date().toISOString()} - ${JSON.stringify(anything, null, 2)}`;

  console.error(log);
}

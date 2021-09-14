export default class ServerUnavailable extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'ServerUnavailable';
  }
}

import { createConnection } from 'typeorm';

export class Database {
  /**
   * @description Connection to the database.
   */
  static async connect() {
    try {
      await createConnection();
    } catch (error) {
      console.warn(error);
    }
  }
}

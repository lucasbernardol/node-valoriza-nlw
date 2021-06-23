import { app } from './app';
import { Database } from './database';

/**
 * Database connection
 */
Database.connect();

const PORT = Number(process.env.PORT) || 3333;

const HOST = process.env.HOST || 'http://localhost:3333';

app.listen(PORT, () => {
  console.log(`\nURL: ${HOST}`);
});

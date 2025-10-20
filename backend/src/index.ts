import { initDatabase } from './db/init';
import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

void (async () => {
  try {
    await initDatabase();
    const PORT = process.env.PORT;
    app.listen(PORT, () =>
      console.info(`express server running on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.error('connection error from database', err);
    process.exit(1);
  }
})();

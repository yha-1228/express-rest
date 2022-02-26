import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

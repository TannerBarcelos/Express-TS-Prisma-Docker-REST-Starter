import { createServer } from './config/createServer';

const app = createServer();

const PORT = process.env.PORT ?? 3131;

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));

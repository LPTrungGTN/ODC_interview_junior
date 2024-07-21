import app from './app';
import { env } from './common/config/envConfig';

const PORT = env.PORT;
app.listen(PORT, () => console.log(`server run :${PORT}`));

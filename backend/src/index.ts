import { app } from './app.js';
import * as config from './config/app.config.js';


app.listen(config.APP_PORT, () => {
    console.log(`Server is running on http://localhost:${config.APP_PORT}`);
});
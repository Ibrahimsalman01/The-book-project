import { app } from './app';
import * as config from './config/config';


app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});
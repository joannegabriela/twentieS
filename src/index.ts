import { app } from './app'
import * as dotenv from 'dotenv';

dotenv.config();

app.listen(process.env.PORT || 8080, () => {
    console.log(`🚀 Server is running. Access: http://localhost:${process.env.PORT}`);
});


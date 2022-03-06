'use strict';

import { init } from './lib/config/bootstrap.js';
import { createServer } from './lib/webserver/server.js';

// Start the server
const start = async () => {
    try {
        await init();
        
        const server = await createServer();
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));;
        
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();
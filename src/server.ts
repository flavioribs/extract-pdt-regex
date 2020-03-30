import chalk from 'chalk';
require('dotenv').config({path: '.env'})

import app from './app'

console.info('----------------------------------------------------');
console.info(chalk.green(`Environment:      ${process.env.NODE_ENV}`));
console.info(chalk.green(`Port:             ${process.env.SERVER_PORT}`));
console.info('----------------------------------------------------');
console.info(`Waiting for connections on port ${process.env.SERVER_PORT}...`);

app.listen(process.env.SERVER_PORT)
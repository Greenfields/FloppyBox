import config from 'config';
import app from './app';

const server = app().listen(
    config.get('port'),
    config.get('host'),
    () => console.log(`FloppyBox started ${JSON.stringify(server.address())}`)
);

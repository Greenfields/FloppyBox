import config from 'config';
import app from './app';

const server = app().listen(
    process.env.PORT || config.get('port'),
    config.get('host'),
    () => console.log(`FloppyBox started ${JSON.stringify(server.address())}`)
);

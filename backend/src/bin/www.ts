import app from '../server';
import debugModule from 'debug';
const debug = debugModule('backend:server');
import http from 'http';
import { Server } from 'socket.io';

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

const server = http.createServer(app);

const io = new Server(server);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.set('io', io);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string): number | string | false {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : addr ? 'port ' + addr.port : 'unknown port';
    debug('Listening on ' + bind);
}
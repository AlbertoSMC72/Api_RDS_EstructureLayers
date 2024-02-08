import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import idex from './src/routes/index.router.js';
import confing from './src/config/confing.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { verifyJWT } from './src/middlewares/socketio/auth.middleware.js';
import { putUsuarioService } from './src/services/users.service.js';
const app = new Express();

app.use(Cors());
dotenv.config();
app.use(Express.json());
app.use("/", idex);

app.set('port', process.env.PORT);

app.use(`*`, (req, res) => {
    res.status(404).send("Ruta equivocada");
});

confing.connect().then(() => {
    console.log("Base de datos conectada");
}).catch((error) => {
    console.log(error);
})

// Socket.io

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"]
    },
    pingInterval: 1000,
    pingTimeout: 2000
});
// Configuración de autenticación de socket.io
io.use(verifyJWT);

// Configuración de handlers de socket.io
const activeRooms = new Map();

io.on('connection', (socket) => {
    console.log('Nuevo jugador conectado', socket.id, socket.handshake.auth.nombre_usuario);

    io.emit('newConnection', `Jugador ${socket.id} se ha conectado`);

    socket.on('createRoom', () => {
        const roomId = Math.random().toString(36).substring(7);
        socket.join(roomId);
        activeRooms.set(roomId, { players: [{ id: socket.id, playerName: socket.handshake.auth.nombre_usuario, choice: '' }] });
        socket.emit('roomCreated', roomId);
    });

    socket.on('joinRoom', (roomId) => {
        const room = activeRooms.get(roomId);
        if (!room || room.players.length >= 2) {
            socket.emit('roomNotFound');
            return;
        }
        socket.join(roomId);
        room.players.push({ id: socket.id, playerName: socket.handshake.auth.nombre_usuario, choice: '' });
        io.to(roomId).emit('playerJoined', room.players);
        if (room.players.length === 2) {
            io.to(roomId).emit('gameStart');
        }
    });

    socket.on('play', ({ roomId, choice }) => {
        const room = activeRooms.get(roomId);
        const player = room.players.find((player) => player.id === socket.id);
        player.choice = choice;

        // Verificar si ambos jugadores han realizado su jugada
        if (room.players.every((player) => player.choice !== '')) {
            // Evaluar el resultado
            const [player1, player2] = room.players;
            const result = evaluateWinner(player1.choice, player2.choice);

            // Enviar información de qué jugador perdió
            const loser = result === '¡Ganaste!' ? player2.playerName : player1.playerName;
            const winner = result === '¡Ganaste!' ? player1.playerName : player2.playerName;

            //logica para dar puntos

            putUsuarioService({ record: 1 }, winner)
                .then((usuario) => console.log(usuario))
                .catch((error) => console.log(error.message))

            putUsuarioService({ record: -1 }, loser)
                .then((usuario) => console.log(usuario))
                .catch((error) => console.log(error.message))

            io.to(roomId).emit('result', { result, loser, winner });
        }
    });

    socket.on('disconnect', () => {
        console.log('Jugador desconectado', socket.id);
        activeRooms.forEach((room, roomId) => {
            const index = room.players.findIndex((player) => player.id === socket.id);
            if (index !== -1) {
                room.players.splice(index, 1);
                io.to(roomId).emit('playerLeft', room.players);
                if (room.players.length === 0) {
                    activeRooms.delete(roomId);
                }
            }
        });
    });
});

function evaluateWinner(choice1, choice2) {
    if (choice1 === choice2) {
        return '¡Empate!';
    } else if (
        (choice1 === 'piedra' && choice2 === 'tijeras') ||
        (choice1 === 'papel' && choice2 === 'piedra') ||
        (choice1 === 'tijeras' && choice2 === 'papel')
    ) {
        return '¡Ganaste!';
    } else {
        return '¡Perdiste!';
    }
}


httpServer.listen(process.env.PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${process.env.PORT}`);
});


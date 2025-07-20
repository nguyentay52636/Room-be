const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken'); // Add JWT import
const { createMessage, updateMessage, deleteMessage } = require('../controllers/messageController');
const PhongChat = require('../models/PhongChat');

const setupSocket = (server) => { 
    const io = socketIo(server, { 
        cors: { 
            origin: [
                'http://localhost:3000',
                'http://localhost:5173',
                'http://localhost:8080',
                process.env.CLIENT_URL
            ].filter(Boolean),
            methods: ['GET', 'POST'],
            credentials: true
        },
        allowEIO3: true,
        transports: ['websocket', 'polling']
    });

    // Add JWT authentication middleware for Socket.IO
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token || socket.handshake.headers.authorization;
            
            if (!token) {
                console.log('❌ No token provided for socket connection');
                return next(new Error('Authentication required'));
            }

            // Remove "Bearer " prefix if present
            const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
            
            jwt.verify(cleanToken, process.env.JWT_ACCESS_KEY, (err, decoded) => {
                if (err) {
                    console.log('❌ Invalid token for socket connection:', err.message);
                    return next(new Error('Invalid token'));
                }
                
                socket.userId = decoded.id;
                socket.userRole = decoded.vaiTro;
                console.log(`✅ Socket authenticated for user ${decoded.id}`);
                next();
            });
        } catch (error) {
            console.log('❌ Socket authentication error:', error.message);
            next(new Error('Authentication failed'));
        }
    });

    // Track user rooms for better management
    const userRooms = new Map();

    io.on('connection', (socket) => {
        console.log('🟢 Socket Connected:', socket.id, 'User:', socket.userId);
        userRooms.set(socket.id, new Set());

        // Enhanced room joining with validation and permission checking
        socket.on('joinRoom', async (roomId) => {
            try {
                console.log(`🔄 User ${socket.userId} attempting to join room: ${roomId}`);
                
                if (!roomId) {
                    console.log(`❌ Missing roomId for socket ${socket.id}`);
                    socket.emit('error', { message: 'Room ID is required' });
                    return;
                }

                // Validate if room exists
                const room = await PhongChat.findById(roomId);
                if (!room) {
                    console.log(`❌ Room ${roomId} not found`);
                    socket.emit('error', { message: 'Room not found' });
                    return;
                }

                // Check if user is a member of the room
                const isMember = room.thanhVien.some(memberId => memberId.toString() === socket.userId);
                if (!isMember) {
                    console.log(`❌ User ${socket.userId} not authorized for room ${roomId}`);
                    socket.emit('error', { message: 'Không có quyền truy cập phòng này' });
                    return;
                }

                // Leave previous rooms if any
                const currentRooms = userRooms.get(socket.id) || new Set();
                for (const prevRoom of currentRooms) {
                    socket.leave(prevRoom);
                    console.log(`👋 User ${socket.userId} left previous room ${prevRoom}`);
                }

                // Join the new room
                socket.join(roomId);
                userRooms.set(socket.id, new Set([roomId]));
                console.log(`✅ User ${socket.userId} joined room ${roomId}`);
                
                // Notify user they successfully joined
                socket.emit('joinedRoom', { 
                    roomId, 
                    message: 'Successfully joined room',
                    timestamp: new Date(),
                    socketId: socket.id
                });
                
                // Notify other users in the room
                socket.to(roomId).emit('userJoined', { 
                    userId: socket.userId,
                    socketId: socket.id, 
                    roomId,
                    timestamp: new Date()
                });

                // Send current room info
                const roomInfo = await io.in(roomId).fetchSockets();
                console.log(`📊 Room ${roomId} now has ${roomInfo.length} connected users`);

            } catch (error) {
                console.error('❌ Error joining room:', error);
                socket.emit('error', { message: 'Failed to join room', error: error.message });
            }
        });

        // Enhanced message creation with authentication and authorization
        socket.on('message:create', async (data) => {
            try {
                console.log('📤 Creating message:', { 
                    roomId: data.roomId, 
                    from: socket.userId,
                    content: data.noiDung?.substring(0, 50) + '...',
                    socketId: socket.id
                });
                
                if (!data.roomId || !data.noiDung) {
                    console.log('❌ Missing required message data:', data);
                    socket.emit('error', { message: 'Missing required message data' });
                    return;
                }

                // Verify user is in the room
                const rooms = Array.from(socket.rooms);
                if (!rooms.includes(data.roomId)) {
                    console.log(`❌ Socket ${socket.id} not in room ${data.roomId}`);
                    socket.emit('error', { message: 'You must join the room first' });
                    return;
                }

                // Set nguoiGuiId from authenticated socket
                data.nguoiGuiId = socket.userId;

                const message = await createMessage(data);
                console.log('✅ Message created successfully:', message._id);
                
                // Broadcast to ALL users in the room (including sender for confirmation)
                io.to(data.roomId).emit('message:new', message);
                console.log(`📡 Message broadcasted to room ${data.roomId}`);
                
                // Log room participants for debugging
                const roomSockets = await io.in(data.roomId).fetchSockets();
                console.log(`📊 Message sent to ${roomSockets.length} connected users in room ${data.roomId}`);
                
            } catch (error) {
                console.error('❌ Error creating message:', error);
                socket.emit('error', { message: 'Failed to create message', error: error.message });
            }
        });

        // Enhanced message update with ownership verification
        socket.on('message:update', async ({ id, noiDungMoi, roomId }) => {
            try {
                console.log('✏️ Updating message:', { id, roomId, userId: socket.userId });
                
                if (!id || !noiDungMoi || !roomId) {
                    socket.emit('error', { message: 'Missing required update data' });
                    return;
                }

                // Verify user is in the room
                const rooms = Array.from(socket.rooms);
                if (!rooms.includes(roomId)) {
                    socket.emit('error', { message: 'You must be in the room to update messages' });
                    return;
                }

                // Check message ownership
                const existingMessage = await TinNhan.findById(id);
                if (!existingMessage) {
                    socket.emit('error', { message: 'Message not found' });
                    return;
                }

                if (existingMessage.nguoiGuiId.toString() !== socket.userId) {
                    socket.emit('error', { message: 'Không có quyền sửa tin nhắn này' });
                    return;
                }

                const updated = await updateMessage(id, noiDungMoi);
                if (!updated) {
                    socket.emit('error', { message: 'Message update failed' });
                    return;
                }
                
                console.log('✅ Message updated successfully:', id);
                io.to(roomId).emit('message:updated', updated);
                
            } catch (error) {
                console.error('❌ Error updating message:', error);
                socket.emit('error', { message: 'Failed to update message', error: error.message });
            }
        });

        // Enhanced message deletion with ownership verification
        socket.on('message:delete', async ({ id, roomId }) => {
            try {
                console.log('🗑️ Deleting message:', { id, roomId, userId: socket.userId });
                
                if (!id || !roomId) {
                    socket.emit('error', { message: 'Missing required delete data' });
                    return;
                }

                // Verify user is in the room
                const rooms = Array.from(socket.rooms);
                if (!rooms.includes(roomId)) {
                    socket.emit('error', { message: 'You must be in the room to delete messages' });
                    return;
                }

                // Check message ownership
                const existingMessage = await TinNhan.findById(id);
                if (!existingMessage) {
                    socket.emit('error', { message: 'Message not found' });
                    return;
                }

                if (existingMessage.nguoiGuiId.toString() !== socket.userId) {
                    socket.emit('error', { message: 'Không có quyền xóa tin nhắn này' });
                    return;
                }

                const deleted = await deleteMessage(id);
                if (!deleted) {
                    socket.emit('error', { message: 'Message delete failed' });
                    return;
                }
                
                console.log('✅ Message deleted successfully:', id);
                io.to(roomId).emit('message:deleted', deleted);
                
            } catch (error) {
                console.error('❌ Error deleting message:', error);
                socket.emit('error', { message: 'Failed to delete message', error: error.message });
            }
        });

        // Add ping/pong for connection health check
        socket.on('ping', () => {
            socket.emit('pong', { timestamp: new Date(), socketId: socket.id, userId: socket.userId });
        });

        // Enhanced disconnect handling
        socket.on('disconnect', (reason) => {
            console.log('🔴 Socket Disconnected:', socket.id, 'User:', socket.userId, 'Reason:', reason);
            
            // Clean up user rooms tracking
            const rooms = userRooms.get(socket.id);
            if (rooms) {
                for (const roomId of rooms) {
                    socket.to(roomId).emit('userLeft', { 
                        userId: socket.userId,
                        socketId: socket.id, 
                        roomId,
                        timestamp: new Date()
                    });
                }
                userRooms.delete(socket.id);
            }
        });

        // Error handler for any unhandled socket errors
        socket.on('error', (error) => {
            console.error('❌ Socket Error for', socket.id, 'User:', socket.userId, ':', error);
        });
    });

    // Add global error handling
    io.engine.on('connection_error', (err) => {
        console.error('❌ Socket.IO Connection Error:', err);
    });

    console.log('🚀 Socket.IO server configured with enhanced real-time messaging and authentication');
    return io;
};

module.exports = { setupSocket };


const { validateUser } = require('../../utils/validateUser');
//models
const Community = require('../../models/community/community');
const Messages = require('../../models/community/messages');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Connection Established');
        /*
         * Join a community chat room
         */
        socket.on('join-room', (data) => {
            const { roomId, token } = data;
            console.log('join room')
            const user = validateUser(token);
            //validation
            if (!user.data.userid && !roomId) return;
            socket.join(roomId);
        });
        /*
        * Leave community chat room
        */
        socket.on('leave-room', (data) => {
            const { communityid } = data;
            if (!communityid) return;
            socket.leave(communityid);
        });
        /*
         * Load Messages of a community chat room
        */
        socket.on('load-messages', async (data) => {
            const { communityid, user, } = data;//here type can be text|image|etc;
            const userValidation = validateUser(user);
            if (!communityid) return;
            if (userValidation.message === 'error') { console.log(userValidation); return; };
            const msgData = await Messages.find({ communityid }).populate('user', 'first_name name').sort({ createdAt: 'ascending' });
            io.in(communityid).emit('send-message', msgData);
        })
        /*
         * Send messages in community chat room
        */
        socket.on('send-message', async (data) => {
            const { communityid, message, user, created_by_type, type } = data;//here type can be text|image|etc;
            const userValidation = validateUser(user);
            let userid = userValidation.data.userid;
            if (!communityid && !userid) return;
            await Messages.create({ communityid, message, user: userid, created_by_type, type });
            const msgData = await Messages.find({ communityid }).populate('user', 'first_name name').sort({ createdAt: 'ascending' });
            io.in(communityid).emit('send-message', msgData);
        })
    })

}
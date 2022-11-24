const { validateUser } = require('../../utils/validateUser');
//models
const Community = require('../../models/community');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Connection Established');
        /*
         * Join a community chat room
         */
        socket.on('join-room', (data) => {
            const { roomId, token } = data;
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
         * Send messages in room
        */
        socket.on('send-message', async (data) => {
            const { communityid, message, user, created_by_type, type } = data;//here type can be text|image|etc;
            const userValidation = validateUser(user);
            let userid = userValidation.data.userid;
            if (!communityid && !userid) return;
            let _id = communityid;
            const msgData = await Community.findOneAndUpdate(
                { _id },
                {
                    $push: { messages: { message, user: userid, created_by_type, type } }
                },
                { new: true, useFindAndModify: false, returnOriginal: false }
            ).populate({ path: 'messages.user' });
            return io.in(communityid).emit('send-message', msgData);

        })
    })

}
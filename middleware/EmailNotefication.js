const { Novu } = require("@novu/node") 
const novu = new Novu(`${process.env.NOVU_API_KEY}`);

exports.EmailNoteficationForLeadAndEnquiry = async (obj) => {
    console.log('email obj', obj);
    const result = await novu.trigger('emailNotefication-sle', {
        to: {
          subscriberId: obj?.email.trim().toLowerCase(),
          email: obj?.email.trim().toLowerCase(),
        },
        payload: {
          type: obj?.type,
          email: obj?.email.trim().toLowerCase(),
          name: obj?.name,
          mobile: obj?.mobile,
          message: obj?.message,
          courses: obj?.courses,
        }
    });
    return result;
}

exports.AssignToEmailNotefication = async (obj) => {
  console.log('email obj AssignToEmailNotefication', obj);
  const result = await novu.trigger('assignto', {
      to: {
        subscriberId: obj?.email.trim().toLowerCase(),
        email : obj?.email.trim().toLowerCase(),
      },
      payload: {
        type: obj?.type,
        name: obj?.name,
        mobile: obj?.mobile,
        message: obj?.message,
      }
    });
    return result;
};
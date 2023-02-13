const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: "dwiabvnna",
	api_key: "717476456995999",
	api_secret: "Dk4UTEefx_Ph-1uCbYDZQwxUTc0"
});

const getCloudinaryUrl = async (base64File) => {
  const buffer = new Buffer.from(base64File.split(',')[1], 'base64');
  const cloudinaryPromise = new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }).end(buffer);
  });
  return cloudinaryPromise;
}
module.exports = getCloudinaryUrl;
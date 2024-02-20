"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const uploadImage = async (image) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    try {
        const result = await cloudinary_1.v2.uploader.upload(image, options);
        console.log(result);
        return result;
    }
    catch (error) {
        console.error(error);
    }
};
async function upload(image) {
    cloudinary_1.v2.config({
        secure: true,
        api_key: '649737161179275',
        cloud_name: 'du4eeagji',
        api_secret: 'VCHwxR-nWh97rxLAtmRViDpd48Y',
    });
    console.log(cloudinary_1.v2.config());
    console.log('entro a subir a cloudinary');
    const res = await uploadImage(image);
    const url = res['url'];
    console.log(res, 'aca estaria el problema ?');
    return url;
}
exports.default = upload;
//# sourceMappingURL=upload.js.map
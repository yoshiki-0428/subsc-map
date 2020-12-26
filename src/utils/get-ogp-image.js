const OGP_TEMPLATE = 'https://res.cloudinary.com/dzaa4buiw/image/upload/l_text:Sawarabi%20Gothic_50_bold:';
const OGP_SETTING = ',co_rgb:FFF,w_1000,c_fit,x_0,y_0/v1608303493/web/minna_subsc_back_empty_black.png';

const getOgpImage = (text) => OGP_TEMPLATE + text + OGP_SETTING;
export default getOgpImage;

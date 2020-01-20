module.exports = 
{
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8081,
    db: process.env.MONGO || 'mongodb://localhost:27017/formBuilder' ,
    appFolder: process.env.MONGO ?  './build/' : '../form-builder/build/'
};

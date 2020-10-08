module.exports = {
    env: {
        MONGO_URI:
            'mongodb+srv://Kevin:teste@clustercep.zs0fs.mongodb.net/vCaixa?retryWrites=true&w=majority',
        MONGO_DB: 'caixa',
        API_URL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "http://caixavirtual.s3-website-sa-east-1.amazonaws.com"
    }
};

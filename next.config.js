module.exports = {
    env: {
        MONGO_URI:
            process.env.NODE_ENV === 'development'
                ? `mongodb+srv://Kevin:teste@clustercep.zs0fs.mongodb.net/vCaixadev?retryWrites=true&w=majority`
                : `mongodb+srv://Kevin:teste@clustercep.zs0fs.mongodb.net/vCaixa?retryWrites=true&w=majority`,
        API_URL:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000'
                : 'https://caixa-virtual-six.vercel.app'
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,PATCH,DELETE,POST,PUT' },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value:
                            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
                    }
                ]
            }
        ]
    }
}

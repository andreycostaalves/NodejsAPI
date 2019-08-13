const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch  (env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://usuario:<senhaBancodeDados>@clusterapi-uxs4k.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'paramore123',
                jwt_expires_in: '7d'
            }

        case 'hml':
            return{
                bd_string: 'mongodb+srv://usuario:<senhaBancodeDados>@clusterapi-uxs4k.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'asijjarjauhsfiahsi',
                jwt_expires_in: '7d'
            }
        
        case 'prod':
            return {
                bd_string: 'mongodb+srv://usuario:<senhaBancodeDados>@clusterapi-uxs4k.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'asudauhshudijjasidj',
                jwt_expires_in: '7d'
            }
    }
}

console.log(`iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();
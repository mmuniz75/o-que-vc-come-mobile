const variables = {
    development: {
        server: 'http://192.168.43.222:5000'
    },
    production: {
        server: 'https://bwnhvraxhc.execute-api.sa-east-1.amazonaws.com/v1'
    }
};
 
const getEnvVariables = () => {
    if (__DEV__) {
        return variables.development; 
    }
    return variables.production; 
};
 
export default getEnvVariables;
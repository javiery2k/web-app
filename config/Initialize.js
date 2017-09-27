import environments from './environment.json';

// define CONFIG
const environment = environments.reduce((result, env) => {
    let currentEnv = result;
    if (window.location.host === env.currentHost) {
        currentEnv = env;
    }
    return currentEnv;
}, '');

// Export the environment
module.exports = environment;

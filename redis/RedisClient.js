const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();
const setAsync = promisify(client.set).bind(client);
const incrAsync = promisify(client.incr).bind(client);
const expireAsync = promisify(client.expire).bind(client);
const getAsync = promisify(client.get).bind(client);
const delAsync = promisify(client.del).bind(client);

module.exports = {
    setAsync,
    incrAsync,
    expireAsync,
    getAsync,
    delAsync
}

const uuid = require('uuid');

const id = uuid.v4();

const teste = ['/post'];

const sadwa = `/post/${id}`;
const path = req.path.replace(/^(\/[a-zA-Z0-9]+)\/[a-zA-Z0-9]+-.+/, '$1');

console.log(path);

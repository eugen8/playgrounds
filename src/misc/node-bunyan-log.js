const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'myapp' });
log.info('hi');
log.warn({ lang: 'fr' }, 'au revoir');
console.log('wow');

const er = new Error('oops');
console.log(er);
log.error(er);

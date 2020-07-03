const config = require('config');
const Bull = require('bull');

const BooksRedis = require('../redis/BooksRedis');

const BOOKS_JOB_SCHEDULE_SECONDS = 30;

const booksQueue = new Bull('books');
const booksRedis = new BooksRedis();

booksQueue.process(async (job) => {
    const { port } = config.get('node');
    const user = job.data.user;
    console.log(`Store books for ${user} on process running on port ${port}`);
    await booksRedis.storeUserBooks(user);
    await booksQueue.add({ user }, {delay: BOOKS_JOB_SCHEDULE_SECONDS * 1000});
});

class BooksWorker {
    async scheduleBooksStoreJob(user) {
        const jobs = (await booksQueue.getJobs(['active', 'wait', 'delayed']))
            .filter(job => user === job.data.user);
        if(!jobs.length) {
            await booksQueue.add({user});
        }
    }
}

module.exports = BooksWorker;

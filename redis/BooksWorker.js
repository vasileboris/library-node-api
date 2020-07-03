const Bull = require('bull');

const BooksRedis = require('../redis/BooksRedis');

const BOOKS_JOB_SCHEDULE_SECONDS = 30;

const booksQueue = new Bull('books');
const booksRedis = new BooksRedis();

booksQueue.process(async (job) => {
    const user = job.data.user;
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

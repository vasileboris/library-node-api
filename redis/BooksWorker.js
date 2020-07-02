const Bull = require('bull');

const BooksRedis = require('../redis/BooksRedis');

const BOOKS_JOB_SCHEDULE_SECONDS = 30;

const booksQueue = new Bull('books');
const booksRedis = new BooksRedis();

booksQueue.process(async (job) => {
    const user = job.data.user;
    console.log(`Start storing ${user} books at ${new Date()}`);
    await booksRedis.storeUserBooks(user);
    await booksQueue.add({ user }, {delay: BOOKS_JOB_SCHEDULE_SECONDS * 1000});
    console.log(`Done storing ${user} books at ${new Date()}`);
});

class BooksWorker {
    async scheduleBooksStoreJob(user) {
        await booksQueue.add({ user });
    }
}

module.exports = BooksWorker;

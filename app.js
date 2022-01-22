const { MongoClient } = require('mongodb');

const main = async () => {
  const url = 'mongodb://localhost:27017';

  const client = new MongoClient(url);

  try {
    await client.connect();

    // await createList(client, {
    //   name: 'test',
    //   age: 20,
    //   address: 'seoul',
    // });

    // await createLists(client, [
    //   {
    //     name: 'test1',
    //     height: 5.8,
    //     address: 'Thika',
    //   },
    //   {
    //     name: 'mine',
    //     height: 5.8,
    //     weight: 60,
    //     address: 'Nairobi',
    //   },
    // ]);

    // await readListByName(client, 'mine');

    await readListByAge(client, 20);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

main().catch(console.error);

const createList = async (client, newlist) => {
  const result = await client
    .db('Learning')
    .collection('learn')
    .insertOne(newlist);

  console.log(`New list created with the following id: ${result.insertedId}`);
};

const createLists = async (client, newLists) => {
  const result = await client
    .db('Learning')
    .collection('learn')
    .insertMany(newLists);

  console.log(`${result.insertedCount} new lists`);
  console.log(result.insertedIds);
};

const listDatabases = async (client) => {
  const databaseList = await client.db().admin().listDatabases();

  console.log('Databases');
  databaseList.databases.forEach((db) => {
    console.log(` - $(db.name)`);
  });
};

const readListByName = async (client, name) => {
  const result = await client
    .db('Learning')
    .collection('learn')
    .findOne({ name });

  if (result) {
    console.log(`Found list: ${result.name}`);

    console.log(result);
  } else {
    console.log(`No listing found with the name: ${name}`);
  }
};

const readListByAge = async (client, age) => {
  const result = await client
    .db('Learning')
    .collection('learn')
    .findOne({ age });

  if (result) {
    console.log(`Found list: ${result.age}`);

    console.log(result);
  } else {
    console.log(`No listing found with the age: ${age}`);
  }
};

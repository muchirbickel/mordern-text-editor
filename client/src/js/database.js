import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('putDb implemented');

  // Create a connection to the database
  const jateDb = await openDB('jate', 1);

  // Creating new transaction
  const transac = jateDb.transaction('jate', 'readwrite');

  // Opening the object store
  const store = transac.objectStore('jate');

  // Adding to the store
  const request = store.add({content});

  // Getting comfirmation
  const result = await request;
  console.log('🚀 - data saved to the database', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('getDb implemented');

  const jateDb = await openDB('jate', 1);

  const transac = jateDb.transaction('jate', 'readonly');

  const store = transac.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();

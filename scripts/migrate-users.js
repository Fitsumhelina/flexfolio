const { MongoClient } = require('mongodb');

async function migrateUsers() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/flexfolio');
  
  try {
    await client.connect();
    const db = client.db('flexfolio');
    const usersCollection = db.collection('users');
    
    // Add username and displayUsername fields to existing users
    const result = await usersCollection.updateMany(
      { 
        $or: [
          { username: { $exists: false } },
          { displayUsername: { $exists: false } }
        ]
      },
      {
        $set: {
          username: null,
          displayUsername: null
        }
      }
    );
    
    console.log(`Updated ${result.modifiedCount} users with username fields`);
    
    // Create indexes for username fields
    await usersCollection.createIndex({ username: 1 }, { unique: true, sparse: true });
    await usersCollection.createIndex({ displayUsername: 1 }, { unique: true, sparse: true });
    
    console.log('Created indexes for username fields');
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await client.close();
  }
}

migrateUsers();

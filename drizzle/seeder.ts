import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from './schemas/user.schema';
import { randomUUID } from 'crypto';
 
neonConfig.fetchConnectionCache = true;
 
const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);

async function addUser() {
  db.insert(users).values({
    id: randomUUID(),
    name: 'XD 177013',
    email: 'xd177013@gmail.com',
    password: '$2y$10$13.LY1gFe.OxbX86.fD1IuzDmicmywBQiiBnlsGZ.H.iRt5xUq4mW' //yakindeck
  }).then(() => {
    console.log('Database has seed')
  }).catch((error) => {
    console.error('Database failed \nReason : ', error)
  })
}

addUser()
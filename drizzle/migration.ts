import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator'
 
neonConfig.fetchConnectionCache = true;
 
const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);

async function migration() {
  await migrate(db, { migrationsFolder: './drizzle/migrations' });  
}

migration().then(() => {
  console.log('migration success')
}).catch((error) => {
  console.error('migration failed. \nproblem : ',error)
})
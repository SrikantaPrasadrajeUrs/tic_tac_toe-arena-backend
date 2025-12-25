// prisma.config.ts
import 'dotenv/config';                    // Loads .env automatically
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',         // Path to your schema
  migrations: {
    path: 'prisma/migrations',            // Where migrations are stored
  },
  datasource: {
    url: env('DATABASE_URL'),             // Required for migrate/dev commands
  },
});
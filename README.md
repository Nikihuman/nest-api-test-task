WELCOME 👋👋👋

---

To install this api

    npm ci

---

Before running this API you must create a .env file in the project root

---

Then in .env file you should create fields:

JWT_SECRET = ""

SALT = ""

DATABASE_URL = "postgresql://(POSTGRES_USER):(POSTGRES_PASSWORD)@localhost:5432/pgdb?schema=public" (I used PostgresDB and PrismaORM)

---

Don't forget to make migration!

    npx prisma migrate dev --name [name]

---

And finally, start the API

    npm run start:dev

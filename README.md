# Full stack Project Management Dashboard

<br/>

## Technology Stack

- Frontend: Next.js, Tailwind CSS, Redux Toolkit, Redux Toolkit Query, Material UI Data Grid
- Backend: Node.js, Express, Prisma
- Database: PostgreSQL, managed with PgAdmin
- Cloud: AWS EC2, AWS RDS, AWS API Gateway, AWS Amplify

<br/>

## Getting started

<br/>

Ensure you have the following installed:

- Git
- Node.js
- npm 
- PostgreSQL
- PgAdmin

<br/>

### Installation steps

#### 1. Clone the Repository
```sh
git clone https://github.com/ellyzaveta/project-management
cd project-management
```

#### 2. Install dependencies
```sh
cd client
npm install
cd ../server
npm install
```

#### 3. Set up the database
```sh
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

#### 4. Configure environment variables
```sh
server: .env (PORT, DATABASE_URL)
client: .env.local (NEXT_PUBLIC_API_BASE_URL)
```

#### 5. Run the project
```sh
npm run dev
```







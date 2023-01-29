# Rank and Edit Completions Assignment

Before running the project you need to create `.env` file.
```
touch .env
```
And then add your OpenAI API Key and DB 
```
DATABASE_URL=file:./db.sqlite
OPENAI_API_KEY=<YOUR-KEY>
```

To run the project
```
yarn install
npx prisma db push
yarn dev
```
Stack: `NextJS 12`, `Prisma`, `Tailwindcss` and `TRPC`

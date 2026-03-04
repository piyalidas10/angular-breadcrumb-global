# MyAngularSsrApp

✅ start → works for CSR dev

✅ build:ssr → correct Angular 19 SSR build flow

✅ serve:ssr → correct Node entry

✅ dev:ssr → best option for SSR development

✅ mock:server → correct mock API setup

🧩 1️⃣ Development (browser only)

npm start
Runs ng serve → browser dev mode (no SSR).

*⚙️ 2️⃣ Build and run with SSR

npm run build:ssr
npm run serve:ssr


### Manually open these URLs in the browser:

👉 http://localhost:4200/products

👉 http://localhost:4200/products/angular-book
 (any slug)

👉 http://localhost:4200/admin

What you should see

/products → product list component

/products/:slug → product detail component
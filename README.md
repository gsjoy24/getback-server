## Instructions on how to run the server locally 📝

- 1️⃣ Clone the repository to your machine if you have the access. Use this link to do it.
  ↦ <https://github.com/gsjoy24/getback-server>
- 2️⃣ Open the project in vs code and create a file named .env in the root of the folder.
- 3️⃣ Add the code bellow in the .env file

```
# you can use your database
DATABASE_URL="postgres://postgres.hdfpkfazkuyxdfaccdav:XM%3F7~Yv%26GQ(t%26b%3F@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
PORT=5000
JWT_ACCESS_SECRET=afhukdayfuiyhvgdcfiasbfdu
JWT_ACCESS_SECRET_EXPIRATION=15d
JWT_REFRESH_SECRET=afhukdayfuiyhvgdcfiasbfdusd
JWT_REFRESH_EXPIRATION=15d
PASS_SAIL=12

APP_EMAIL=gour.joy24@gmail.com
APP_PASSWORD=jhypfgmhyzwrlkid

# admin credential
ADMIN_EMAIL=gour.joy24@gmail.com
ADMIN_PASSWORD=SuperAdmin0

```

- 4️⃣ Open the command prompt on the project path or terminal on the vs code by pressing Ctrl + `
- 5️⃣ Run the command 'npm i' or 'npm install' to install all the necessary dependencies.
- 6️⃣ To run the server on <http://localhost:3000>, run the command 'npm run start:dev'. if the server is running, you will see the code bellow on your machine.

```
// on terminal or cmd
Server is running on http://localhost: 3000

// on http://localhost:3000/
{
   "status": "success",
   "message": "server for lost and find is running!"
}
```

- 7️⃣ To run the production version, run the command 'npm run build' to build the project. After complete the build process, run 'npm run start:prod' to run the build or production version on the localhost.

#### This server is deployed on vercel

client-git: <https://github.com/gsjoy24/getback-client>
backend-git: <https://github.com/gsjoy24/getback-server>

client-live: <http://getback.vercel.app/>
backend-live: <https://lost-and-found-server-joy.vercel.app/>

admin -
email : <gour.joy24@gmail.com>
password : SuperAdmin0

user -
email :gour@gmail.com
password: password

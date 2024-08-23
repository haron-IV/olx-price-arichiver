setup:

1. pnpm install
2. pnpm init-app // this step will delete all of your saved data (will create new file)

running:

1. pnpm dev // it will run dev server
   if there is no access token for olx api it will run browser via puppert
   if you werent logged in into your olx account in puppeter browser you have to login and reset app (tun pnpm dev)
   then app will automaticaly can get your token when it expires (it does every few minutes)
2. it will work :D
3. in directory ./db you will have 3 files
   data.json - your entire data
   data.template.json - template for your data.json file
   grouppedData.json - your data, but gruppet by configured property

in ./userData directory is stored browser data from puppeteer. It has session, cookies, etc.

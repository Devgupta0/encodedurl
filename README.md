## In this I have created a system that can encoded a url in one time use only.
# Architecture of the system
 - Their are 3 folders where these seprated by different files.
1.) mongomodel
- In this folder I have created a url model file for storing url data.
2.) config
- In this folder I have created 2 files one db.js and another one is default.json.
- In db.js I have provided a credentials for db connection.
- In default.json i have passed the default url and one parameter for handling access of using url one time.
3.) views
- In this folder I have created 2 files one is convert.ejs and another one is error.ejs.
- In convert.ejs there is UI for taking url as a input and submit button which will the url in the backend and shows the encoded url in same UI.
- In error.ejs there is also UI That only show the message if user exceded a limit.

# Main File for handling UI and backend API
In index.js I have created 2 API one for getting the url from the UI and process them and show you a encoded url response to UI. 
In the process of converting and making a encoded url I have used a unique ID every time when new url came API generate a Unique ID and save in the database with encoded url and encoded value.
In another API it will show you a expected result when you call encoded url in the browser and it will check also if it first time you are calling it will show you a expected result and if exceded a limit it will shows you " Not Found Request exceded" Message. 

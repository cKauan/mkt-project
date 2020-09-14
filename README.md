![alt text](https://i.imgur.com/oEoWP01.png)
# :clipboard: User Manager
A Project to Manage and to Award Registered Users

## :computer: Website
https://mkt-project.herokuapp.com/

## :brain: Used Technologies 
<p align="left">
  <img src="https://devicons.github.io/devicon/devicon.git/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> 
  <img src="https://devicons.github.io/devicon/devicon.git/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/>
  <img src="https://devicons.github.io/devicon/devicon.git/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
  <img src="https://devicons.github.io/devicon/devicon.git/icons/nodejs/nodejs-original.svg" alt="nodejs" width="40" height="40"/>
  <img src="https://devicons.github.io/devicon/devicon.git/icons/express/express-original.svg" alt="express" width="40" height="40"/>
  <img src="https://devicon.dev/devicon.git/icons/mongodb/mongodb-original.svg" alt="mongo" width="40" height="40"/>
  <img src="https://mozilla.github.io/nunjucks/img/favicon.png" alt="nunjucks" width="40" height="40"/>
  <br>
  <br>
</p>

## :pushpin: Installation
Use ```npm``` or ```yarn``` to install all dependencies
```bash
yarn
```
or
```bash
npm install
```


## :pencil: How to Use
You'll need create a ```.env``` file and set these environment variables
```
MONGODB_URI = Your mongodb uri
GOOGLE_CLIENT_SECRET = Google Credentials 
GOOGLE_CLIENT_ID = Google Credentials 
CALLBACK_URL = Google Credentials
```
You can see more about google credentials at passports.js <a href="http://www.passportjs.org/packages/passport-google-oauth20/" target="_blank">documentation</a>

## :bookmark: Project Responsibilities

- [x] Admin Panel
- [x] User Registration
- [x] User Management
- [x] Send Whatsapp Messages

## :information_source: How it Works

* You log in your google account and access the sistem.
* Logged, you can register users.
* When the registered users get more then 500 reais, they become awarded users.
* At awarded users tab, you can send whatsapp messages to their registered numbers.

## :raised_hand: Contributions
To Sugestions, open an "issue", be free to do it.

## :scroll: License
[MIT](https://choosealicense.com/licenses/mit/)

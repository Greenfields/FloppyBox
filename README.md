# Floppy Box
A game inspired by flappy-bird developed using PhaserJS with a Node.JS server

## Getting Started

**Prerequisites** Please ensure that you have Node.js v6.4.x installed [nodejs.org](http://nodejs.org/dist/v6.4.0/) once this is installed upgrade npm (`$ npm install -g npm`).
Then install `gulp` globally (`$ npm install -g gulp`)

To get started fork this repository, clone it, then install the dependencies:
```
$ npm install
```

Run build to build the site and it's assets
```
$ npm run build
```

Should you want to run the site locally move into the dist directory (```$ cd dist```) and install the dependencies:
```
$ cd dist
$ npm install --production
```

Then you can run:
```
$ npm run start
```

In your chosen browser visit
```
$ localhost:3000
```
and you should see the site running.

##Cleaning the dist directory

You can clean down the dist directory by running
```
$ npm run clean
```
This will remove the directory so that you can rebuild the site from scratch.

## Use with Heroku

**Prerequisites** Ensure you have download and installed [Heroku Command Line Interface (CLI)](https://devcenter.heroku.com/articles/heroku-command-line#download-and-install)

Log in to Heroku account with provided email address and password, from the command line:
```
$ heroku login
```

Create an app on Heroku
```
$ heroku create
```

Once an app is created a git remote (called ```heroku```) is created and associated to your local  git repo. 

Heroku will generate a random name for your app which you'll see in the response following creation.

To deploy your code (from master)

```
$ git push heroku master
```

If you want to deploy another branch instead of master (e.g. ```my-new-branch```)

```
$ git push heroku my-new-branch:master
```

The application is now deployed, you can ensure at least one instance is running:

```
$ heroku ps:scale web=1
```

You can visit the app at the url generated by its app name using the shortcut:

```
$ heroku open
```

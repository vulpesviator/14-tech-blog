# Tech Blog

## Description

This project creates a CMS-style blog using the MVC architecture utilizing handlebars.js, MySql database, Sequelize to map objects and databases, and express-session authentication.  A user can create an account, log in, make new posts, and comment on existing posts. They can also update or delete the post they have made.

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Installation

To run this application locally, clone or download the repo which contains the necessary models, js, and handlebars views organized in the MVC structure. You will need to create an .env file for your local repo to contain the database name, user, password, and session secret.

## Usage

The site is currently deployed for review on [Heroku](https://mvc14-tech-blog-231546f0eef6.herokuapp.com/)

![Tech Blog](./assets/img.gif)

1. Begin by logging into your local MySQL environment with `mysql -u root -p`. You will be prompted to enter your password for your MySQL instance.
2. Next locate the schema source for your database by entering `source db/schema.sql` or the path to the schema.sql file in your directory. This should respond with the database being created. If created successfully you can exit the MySQL interface with `exit`
3. If you want to start with data in the blog, you can run the seeds with `npm run seed`. This will fill in the tables of the database with Users, Comments, and blog Posts.
4. Then you can start the server by typing `npm run start`.
5. The server will be running on the local port listed in the CLI.


## Contributing

- [Bootstrap Login Forms](https://mdbootstrap.com/docs/standard/extended/login/)
- [JAWSDB MySQL](https://elements.heroku.com/addons/jawsdb)
- 23-INS_Auth-Review


## License
  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The MIT License

## Questions

Created by [vulpesviator](http://github.com/vulpesviator)

[Contact Me](vulpesviator@gmail.com)

Copyright (c) [2023] [Travis Hoffman]
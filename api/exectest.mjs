
// This file is only for development use
// This file runs the deploy_schemas.sql file which effectively refreshes the database
    // It drops the database  then create it again
// package.json cannot access the env variables, this is a work around for this problem
// package.json uses node to run this file, this file uses execSync to run the psql command using the .env variables instead of the psql user and password 
    //  REsult: databse can be refreshed without uploading username and password to git

    // POSTGRES_HOST is localhost when in development

import 'dotenv/config';

import { execSync } from 'child_process';
// import { execSync } from 'child_process';  // replace ^ if using ES modules

// const output = execSync(`psql -U ${process.env.POSTGRES_USER} -f ./database/deploy_schemas.sql`, { encoding: 'utf-8' });  // the default is 'buffer'
const output = execSync(`psql -f ./database/deploy_schemas.sql postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}`, { encoding: 'utf-8' });  // the default is 'buffer'
console.log('Output was:\n', output);
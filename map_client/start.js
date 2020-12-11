const concurrently = require("concurrently");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const { exec } = require("child_process");

const isWin = process.platform === 'win32';
const runGradle = isWin 
                ? "cd ../graphapi && .\\gradlew bootRun"
                : "cd ../graphapi && ./gradlw bootRun"; 

const crimeAnalyserMobile = path.join(__dirname, "../../", "crime_analyser_mobile");
const startConcurrently = () => {
  concurrently([
    "npm start",
    `cd ${crimeAnalyserMobile} && npm run dev`,
    runGradle
  ]);
};

fs.access(crimeAnalyserMobile, fs.constants.F_OK, (err) => {
  if(err) {
    console.log(chalk.yellow("Crime Analyser Mobile clone does not exist in the correct path ") + "❌");
    console.log(chalk.green("Cloning the repo... ") + "✔️");
    exec("cd ../../ && git clone https://github.com/ShubhankarKG/crime_analyser_mobile.git")
    .on('close', (code,status) => {
      if(code === 0) {
        console.log(chalk.green("Installing dependencies... ") + "✔️");
        exec(`cd ${crimeAnalyserMobile} && git checkout nav && npm install`)
        .on('close', (innerCode, signal) => {
          if(innerCode === 0) {
            console.log(chalk.green("Installed dependencies... ") + "✔️");
            console.log(chalk.green("Creating .env file... ") + "✔️");
            fs.writeFile(`${crimeAnalyserMobile}/.env`, "GUSER=\nGPASSWORD=\nUSER=\nPASSWORD=\nGOOGLE_APPLICATION_CREDENTIALS=\n", (innerErr) => {
              if(innerErr) {
                console.log(chalk.yellow("Failed to write .env file, please make it yourself and restart") + "❌");
              } else {
                console.log(chalk.cyanBright("Please add details about your databases in .env file and restart ") + "✔️");
              }
            })
            
          }
        });
      }
    });
  } else {
    console.log(chalk.green("Crime Analyser Mobile clone exists in the correct path ") + "✔️");
    startConcurrently();
  }
});


#!/usr/bin/env node

"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const ora = require('ora');

const throbber = ora({
    text: 'Tinkering with all the Zoinkys',
    spinner: {
        frames: ['😎', '🧐', '🤓', '😊'],
        interval: 10, // Optional
    },
}).start();

const response = chalk.bold.green;

const profile = require("./profile.json");

const profilePrompts = {
    type: "list",
    name: "profileOptions",
    message: "Decode the jargon!",
    choices: [...Object.keys(profile), "Exit"]
};

function main() {
    // Simulating some asynchronous work for 5 seconds...
    setTimeout(() => {
        throbber.stop();
        kanataki()
        menu()
    }, 1000 * 5);
}

function kanataki() {
    console.log(
        chalk.yellow(
            figlet.textSync('NLG', { horizontalLayout: 'full' }))
    );
    console.log("Howdy, Welcome to the NLG profile!");
}


function menu() {

    profileHandler();
}

function profileHandler() {
    inquirer.prompt(profilePrompts).then(answer => {
        if (answer.profileOptions == "Exit") {
            return;
        }
        var option = answer.profileOptions;
        console.log(response("--------------------------------------"));
        profile[`${option}`].forEach(info => {
            console.log(response("|   => " + info));
        });
        console.log(response("--------------------------------------"));

        inquirer
            .prompt({
                type: "list",
                name: "exitBack",
                message: "Go back or Exit?",
                choices: ["Back", "Exit"]
            })
            .then(choice => {
                if (choice.exitBack == "Back") {
                    profileHandler();
                } else {
                    return;
                }
            });
    });
}

main();
#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = require("../package.json");
const index_1 = require("../src/index");
commander_1.program
    .name('vps-deckhand')
    .description('vps-deckhand is a simple CLI tool designed to streamline Linux VPS deployments by orchestrating code repositories, secrets, variables, DNS, and CI/CD pipelines from multiple providers, all from a single configuration file.')
    .version(package_json_1.version);
commander_1.program
    .command('run')
    .description('Execute the CLI')
    .action(() => {
    (0, index_1.run)();
});
commander_1.program.parse(process.argv);

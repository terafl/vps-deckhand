#!/usr/bin/env node

import { program } from 'commander';
import { version } from '../package.json';
import { run } from '../src/index';

program
  .name('vps-deckhand')
  .description('vps-deckhand is a simple CLI tool designed to streamline Linux VPS deployments by orchestrating code repositories, secrets, variables, DNS, and CI/CD pipelines from multiple providers, all from a single configuration file.')
  .version(version);

program
  .command('run')
  .description('Execute the CLI')
  .action(() => {
    run();
  });

program.parse(process.argv);

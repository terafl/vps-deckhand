#!/usr/bin/env node

import 'tsconfig-paths/register';

import { program } from 'commander';
import { version } from '../package.json';
import { secretCommand } from '../src/secret/infrastructure/commands/secret.command';

program
  .name('vps-deckhand')
  .description('vps-deckhand is a simple CLI tool designed to streamline Linux VPS deployments...')
  .version(version);

program.addCommand(secretCommand);

program.parse(process.argv);

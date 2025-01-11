import { Command } from 'commander';
import { connectProviderCommand } from './connectProvider.command';

export const secretCommand = new Command('secrets')
  .description('Manage secrets for deployment')
  .addCommand(connectProviderCommand)

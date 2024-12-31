import { GithubTokenValueObject } from '@/secret/domain/valueObjects/githubToken.valueObject';
import { Command } from 'commander';
import inquirer from 'inquirer';

export const connectProviderCommand = new Command('connect-provider')
  .description('Connect a secrets provider')
  .argument('<provider>', 'The provider to connect (e.g., github)')
  .action(async (provider: string) => {
    if (provider === 'github') {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'token',
          message: 'Enter your GitHub token:',
          validate: (input) => { 
            new GithubTokenValueObject(input)
            return true
          },
        },
      ]);

      console.log(`GitHub connected successfully with token: ${answers.token}`);
    } else {
      console.log(`Provider ${provider} is not supported yet.`);
    }
  });

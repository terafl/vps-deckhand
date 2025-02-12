import { Command } from 'commander';
import inquirer from 'inquirer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Octokit } from '@octokit/rest';
import { tokenStore } from '@/secret/infrastructure/secure-stores/githubTokenStore.entity';

async function pushGlobalSecret(secretName: string, secretValue: string, octokit: Octokit): Promise<void> {
  console.log(`Pushing global secret: ${secretName}`);
  console.log(`This feature is not implemented yet.`);
}

async function pushRepoSecret(
  repoName: string,
  secretName: string,
  secretValue: string,
  octokit: Octokit
): Promise<void> {
  console.log(`Pushing secret: ${secretName} to repository: ${repoName}`);

  const { data: keyData } = await octokit.actions.getRepoPublicKey({
    owner: repoName.split('/')[0],
    repo: repoName.split('/')[1],
  });

  const crypto = await import('crypto');
  const key = Buffer.from(keyData.key, 'base64');
  const encryptedSecret = crypto.publicEncrypt(
    { key, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
    Buffer.from(secretValue)
  );

  await octokit.actions.createOrUpdateRepoSecret({
    owner: repoName.split('/')[0],
    repo: repoName.split('/')[1],
    secret_name: secretName,
    encrypted_value: encryptedSecret.toString('base64'),
    key_id: keyData.key_id,
  });

  console.log(`Secret '${secretName}' successfully added to repository '${repoName}'.`);
}

async function getSecretValueFromPrompt(secretName: string): Promise<string> {
  const { secretValue } = await inquirer.prompt([
    {
      type: 'input',
      name: 'secretValue',
      message: `Enter the value for secret '${secretName}':`,
    },
  ]);
  return secretValue;
}

async function getSecretValueFromEnv(secretName: string): Promise<string | null> {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.error('Error: .env file not found in the current directory.');
    return null;
  }

  dotenv.config({ path: envPath });
  const secretValue = process.env[secretName];

  if (!secretValue) {
    console.error(`Error: Secret '${secretName}' not found in the .env file.`);
    return null;
  }

  return secretValue;
}

export const pushCommand = new Command('push')
  .description('Push a secret to GitHub')
  .argument('<secretName>', 'The name of the secret to push')
  .option('--global', 'Push the secret globally (default)', true)
  .option('--repo <repository>', 'Push the secret to a specific repository')
  .option('--from-env', 'Read the secret value from the .env file in the current directory')
  .action(async (secretName: string, options: { global: boolean; repo?: string; fromEnv?: boolean }) => {

    const githubToken = await tokenStore.getToken('github');
    if (!githubToken) {
      console.error('Error: GitHub token not found. Please run `vps-deckhand secrets connect-provider github` first.');
      process.exit(1);
    }

    const octokit = new Octokit({ auth: githubToken });

    let secretValue: string | null = null;
    if (options.fromEnv) {
      secretValue = await getSecretValueFromEnv(secretName);
      if (!secretValue) return;
    } else {
      secretValue = await getSecretValueFromPrompt(secretName);
    }

    if (options.repo) {
      await pushRepoSecret(options.repo, secretName, secretValue, octokit);
    } else {
      await pushGlobalSecret(secretName, secretValue, octokit);
    }
  });

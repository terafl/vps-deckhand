import keytar from 'keytar';

class TokenStore {
  private service = 'vps-deckhand-tokens';

  async setToken(key: string, token: string): Promise<void> {
    await keytar.setPassword(this.service, key, token);
  }

  async getToken(key: string): Promise<string | null> {
    return await keytar.getPassword(this.service, key);
  }

  async deleteToken(key: string): Promise<boolean> {
    return await keytar.deletePassword(this.service, key);
  }
}

const tokenStore = new TokenStore();
export { tokenStore };

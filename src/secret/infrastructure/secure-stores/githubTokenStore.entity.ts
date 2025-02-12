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
// class TokenStore {
//   private tokens: Record<string, string> = {}; // Almacena los tokens por proveedor

//   setToken(provider: string, token: string): void {
//     this.tokens[provider] = token;
//   }

//   getToken(provider: string): string | null {
//     return this.tokens[provider] || null;
//   }

//   deleteToken(provider: string): void {
//     delete this.tokens[provider];
//   }
// }

// // Instancia única del TokenStore
// const tokenStore = new TokenStore();
// export { tokenStore };

class SecretProviderError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, SecretProviderError.prototype)
    }
}

export { SecretProviderError }
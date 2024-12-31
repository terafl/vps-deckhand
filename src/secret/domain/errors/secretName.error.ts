class SecretNameError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, SecretNameError.prototype)
    }
}

export { SecretNameError }
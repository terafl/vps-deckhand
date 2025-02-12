class GithubTokenError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, GithubTokenError.prototype)
    }
}

export { GithubTokenError }
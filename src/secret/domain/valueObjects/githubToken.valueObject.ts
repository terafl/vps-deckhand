import { StringValueObject } from "@/common/domain/valueObjects/string.valueObject";
import { GithubTokenError } from "../errors/githubToken.error";

class GithubTokenValueObject extends StringValueObject {
    constructor(value: string) {
        super(value)
        this.checkValueIsValid();
    }

    checkValueIsValid() {
        const githubTokenRegex = /^(gh[porsu]_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{22,})$/;

        if (!githubTokenRegex.test(this.value)) {
            throw new GithubTokenError("Invalid Github Token")
        }
    }
}

export { GithubTokenValueObject }
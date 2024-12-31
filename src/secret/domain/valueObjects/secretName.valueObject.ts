import { StringValueObject } from "@/common/domain/valueObjects/string.valueObject";
import { SecretNameError } from "../errors/secretName.error";

class SecretNameValueObject extends StringValueObject {
    constructor(value: string) {
        super(value)
        this.checkValueIsValid();
    }

    checkValueIsValid() {
        const variableRegex = /^[A-Z]+(?:_[A-Z]+)*$/;
        if (!variableRegex.test(this.value)) {
            throw new SecretNameError(`Invalid Secret Name ${this.value}.`)
        }
    }
}

export { SecretNameValueObject }
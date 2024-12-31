import { StringValueObject } from "@/common/domain/valueObjects/string.valueObject";

class SecretValueValueObject extends StringValueObject {
    constructor(value: string) {
        super(value)
    }
}

export { SecretValueValueObject }
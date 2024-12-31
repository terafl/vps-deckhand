import { StringValueObject } from "@/common/domain/valueObjects/string.valueObject";
import { SecretsProvidersEnum } from "../constants/secretsProviders.constant";
import { SecretProviderError } from "../errors/secretProvider.error";

class SecretProviderValueObject extends StringValueObject {
    private validValues: string[]
    constructor(value: string) {
        super(value)
        this.checkValueIsValid();
        this.validValues = Object.values(SecretsProvidersEnum)
    }

    checkValueIsValid() {
        if ( !this.validValues.includes(this.value) ) {
            throw SecretProviderError
        }
    }
}

export { SecretProviderValueObject }
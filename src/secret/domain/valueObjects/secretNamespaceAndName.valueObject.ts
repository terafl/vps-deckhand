import { StringValueObject } from "@/common/domain/valueObjects/string.valueObject";
import { SecretsProvidersEnum } from "../constants/secretsProviders.constant";import { SecretNameError } from "../errors/secretName.error";

class SecretNamespaceAndNameValueObject extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.checkValueIsValid();
    }

    checkValueIsValid() {
        const providers = Object.values(SecretsProvidersEnum).join('|');
        const withoutProviderVariableNameRegex = /^[A-Z]+(?:_[A-Z]+)*$/;

        const withProviderVariableNameRegex = new RegExp(`^(${providers}):(${withoutProviderVariableNameRegex.source})$`);

        const isValid = withProviderVariableNameRegex.test(this.value) || withoutProviderVariableNameRegex.test(this.value);

        if (!isValid) {
            throw new SecretNameError(`Invalid Secret Name: ${this.value}. Must match either a PROVIDER:VARIABLE_NAME format or a VARIABLE_NAME format.`);
        }
    }
}

export { SecretNamespaceAndNameValueObject };

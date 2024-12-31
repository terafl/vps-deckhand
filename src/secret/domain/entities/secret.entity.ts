import { SecretsProvidersEnum } from "../constants/secretsProviders.constant";
import { SecretNameValueObject } from "../valueObjects/secretName.valueObject";
import { SecretNamespaceAndNameValueObject } from "../valueObjects/secretNamespaceAndName.valueObject";
import { SecretProviderValueObject } from "../valueObjects/secretProvider.valueObject";

interface ISecret {
    name: string,
    value: string
}

type InputSecretData = {
    nameWithNamespace: SecretNamespaceAndNameValueObject
    value: string
}

class Secret {
    public readonly provider: SecretProviderValueObject
    public readonly name: SecretNameValueObject
    public readonly value: string

    constructor( inputData: InputSecretData ) {
        const { nameWithNamespace, value } = inputData;
        const nameWithNamespaceValue = nameWithNamespace.value;

        if (nameWithNamespaceValue.includes(":")) {
            const rawNameParts = nameWithNamespaceValue.split(":")
            this.provider = new SecretProviderValueObject(rawNameParts[0])
            this.name = new SecretNameValueObject(rawNameParts[1])
        } else {
            this.provider = new SecretProviderValueObject(SecretsProvidersEnum.HARDCODE)
            this.name = new SecretNameValueObject(nameWithNamespaceValue)
        }

        this.value = value
    }

    public static create(inputData: ISecret): Secret {
        const nameWithNamespace = new SecretNamespaceAndNameValueObject(inputData.name)
        const value = inputData.value;

        const secret = new Secret({
            nameWithNamespace,
            value
        })

        return secret
    }
}

export { Secret }
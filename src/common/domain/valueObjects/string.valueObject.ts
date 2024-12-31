import { ValueObject } from './base.valueObject';

abstract class StringValueObject extends ValueObject<string> {
    constructor(value: string) {
        super(value);
    }

    toString(): string {
        return this.value;
    }
}

export { StringValueObject };

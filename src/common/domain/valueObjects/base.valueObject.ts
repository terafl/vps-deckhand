abstract class ValueObject<Type> {
    public value: Type;
    constructor(value: Type) {
        this.value = value;
    }
}

export { ValueObject };

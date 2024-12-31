import type IGenericObject from '../interfaces/genericObject.interface';
import { ValueObject } from './base.valueObject';

abstract class ObjectValueObject extends ValueObject<IGenericObject> {
    constructor(value: IGenericObject) {
        super(value);
    }
}

export { ObjectValueObject };

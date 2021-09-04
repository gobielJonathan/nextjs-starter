import {
    isEmpty,
    isEqual,
    isArray,
    isObject,
    isSet,
    isString,
    isNull, isUndefined
} from 'lodash-es'

import isEmail from "is-email";
import { define, validate } from "superstruct";

export const Required = (error = "must be required") =>
    define("Required", (v) => {
        let valid = !isUndefined(v) && !isNull(v)
        if (valid) {
            if (isObject(v) || isArray(v) || isSet(v)) {
                valid = !isEmpty(v)
            } else if (isString(v)) valid = v.length > 0
        }
        return valid || error
    });

export const Email = (error = "not email format") =>
    define("Email", (v) => isEmail(v) || error);

export const Min = (min, error = "must be at least") =>
    define("Min", (v) => {
        let valid = false;
        if (typeof v === "number") valid = v >= min;
        if (typeof v === "string") {
            if (parseInt(v, 10) != NaN) {
                valid = parseInt(v, 10) >= min
            } else valid = v.length >= min
        }
        return valid || error;
    });

export const SameWith = (target = "", error = "value tidak sama dengan ") =>
    define("SameWith", (v, parent) => {
        const [obj] = parent.branch;
        return isEqual(obj[target], v) || error;
    });


export const ValueIn = (target = [], error = "value tidak ada di dalam requirements") =>
    define("ValueIn", (v, parent) => {
        return target.includes(v) || error;
    });

export const CustomFunc = (callback, error = "validation error using custom validation") =>
    define("CustomFunc", (v) => callback(v) || error);


export const Between = (min, max, error = "value must be between in requirements") =>
    define("Between", (v) => {
        let valid = false
        if (typeof v == "string") {
            valid = v.length >= min && v.length <= max
        }
        if (typeof v == "number") valid = v >= min && v <= max

        return valid || error
    });

export const Validation = (values, struct) => {
    const [error] = validate(
        values,
        struct
    );
    const errors = error?.failures()

    if (!errors) return {}
    return errors?.reduce((curr, { key, message }) => {
        if (!curr[key])
            curr[key] = message
        return curr
    }, {})
}
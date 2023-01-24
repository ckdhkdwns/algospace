export interface NonEmptyArray<T> extends Array<T> {
    // would need to implement all relevant functions.
    pop: () => T;
}
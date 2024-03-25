declare global {
  interface Object {
    _remap<P, R>(mapper: Function, keys?: Array<keyof P>, entityKeys?: Array<keyof R | null>): Partial<R>;

    _range<P, R>(
      mapper: Function,
      keysMin: Array<keyof P>,
      keysMax: Array<keyof P>,
      originalKeys: Array<keyof R>,
    ): Partial<R>;

    _chain<R>(callback: Function, key: keyof R): Partial<R>;
  }
}

if (!Object.prototype.hasOwnProperty('_remap')) {
  Object.defineProperty(Object.prototype, '_remap', {
    value: function <P, R>(
      mapper: Function,
      keys?: Array<keyof P>,
      entityKeys: Array<keyof R | null> = [],
    ): Partial<R> {
      const objectKeys = keys || (Object.keys(this) as Array<keyof P>);
      const payload: P = this;

      const mappedConditions = objectKeys.reduce((acc: Partial<R>, key: keyof P, index: number) => {
        const value = payload[key];

        if (!value) return acc;

        const preassignedKeyName = entityKeys[index];

        if (preassignedKeyName) {
          delete payload[key];
        }

        return { ...acc, [preassignedKeyName || key]: mapper(value) };
      }, {});

      return { ...payload, ...mappedConditions };
    },
  });
}

if (!Object.prototype.hasOwnProperty('_range')) {
  Object.defineProperty(Object.prototype, '_range', {
    value: function <P, R>(
      mapper: Function,
      keysMin: Array<keyof P>,
      keysMax: Array<keyof P>,
      originalKeys: Array<keyof P>,
    ): Partial<R> {
      const payload: P = this;

      const mappedConditions = originalKeys.reduce((acc: Partial<R>, originalKey: keyof P, index: number) => {
        const keyMin = keysMin[index];
        const keyMax = keysMin[index];

        const { [keyMin]: minValue, [keyMax]: maxValue, ...otherFields }: P = payload;

        if (!this.hasOwnProperty(keyMin) || !this.hasOwnProperty(keyMax)) {
          return this;
        }

        return { ...acc, ...otherFields, [originalKey]: mapper(minValue, maxValue) };
      }, {});

      return { ...payload, ...mappedConditions };
    },
  });
}

if (!Object.prototype.hasOwnProperty('_chain')) {
  Object.defineProperty(Object.prototype, '_chain', {
    value: function <R>(callback: Function, key: keyof R): Partial<R> {
      const payload = this[key];

      if (!payload) return this;

      const { page, take, ...otherFields } = payload;

      return { ...this, [key]: callback(otherFields) };
    },
  });
}

export {};

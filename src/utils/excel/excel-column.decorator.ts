import 'reflect-metadata';

const metadataKey = 'metadataKey';
export function ExcelColumn(metadataValue: number): PropertyDecorator {
  return function (ctorPrototype: any, propertyKey: string): void {
    // original functionality
    Reflect.defineMetadata(
      'data:' + metadataKey,
      metadataValue,
      ctorPrototype,
      propertyKey,
    );

    // new functionality
    let propertyKeys =
      Reflect.getOwnMetadata('keys:' + metadataKey, ctorPrototype) ||
      (Reflect.getMetadata('keys:' + metadataKey, ctorPrototype) || []).slice(
        0,
      );
    Reflect.defineMetadata('keys:' + metadataKey, propertyKeys, ctorPrototype);

    // record new property key
    propertyKeys.push(propertyKey);
  };
}

function getMyPropertyDecorator(
  ctor: { prototype: any },
  metadataKey: string,
  propertyKey: string,
) {
  return Reflect.getMetadata(
    'data:' + metadataKey,
    ctor.prototype,
    propertyKey,
  );
}

function getMyPropertyDecoratorPropertyKeys(
  ctor: { prototype: any },
  metadataKey: string,
) {
  return (Reflect.getMetadata('keys:' + metadataKey, ctor.prototype) ||
    []) as string[];
}

export function getMyPropertyDecorators(ctor: { prototype: any }) {
  const ret: Record<string, any> = {};
  for (let propertyKey of getMyPropertyDecoratorPropertyKeys(
    ctor,
    metadataKey,
  )) {
    ret[propertyKey] = getMyPropertyDecorator(ctor, metadataKey, propertyKey);
  }
  return ret;
}

function getMyPropertyDecoratorValues(ctor: { prototype: any }) {
  const myPropertyDecorators = getMyPropertyDecorators(ctor);
  return Object.keys(myPropertyDecorators).map(
    (propertyKey) => myPropertyDecorators[propertyKey],
  );
}

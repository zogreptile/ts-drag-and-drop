export function autobind(target: any, methodName: string) {
  const method = target[methodName];
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return method.bind(this);
    },
  };

  return newDescriptor;
}

type TSubscriberFn<T> = (items: T[]) => void;

export abstract class Store<T> {
  protected elements: T[] = [];
  protected subscribers: TSubscriberFn<T>[] = [];

  protected constructor() {}

  subscribe(subscriberFn: TSubscriberFn<T>) {
    this.subscribers.push(subscriberFn);
  }

  broadcast() {
    this.subscribers.forEach(subscriber => subscriber(this.elements.slice()));
  }

  addItem(item: T) {
    this.elements.push(item);
    this.broadcast();
  }
}

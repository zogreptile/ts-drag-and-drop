export abstract class BaseComponent<T extends HTMLElement> {
  protected template: HTMLTemplateElement;
  protected html: T;

  constructor(
    public templateId: string,
    public rootNode: HTMLElement,
  ) {
    this.template = document.getElementById(templateId) as HTMLTemplateElement;
    const importedNode = document.importNode(this.template.content, true);
    this.html = importedNode.firstElementChild as T;

    this.render();
  }

  protected abstract configure(): void;

  private render() {
    this.rootNode.append(this.html);
  };
}

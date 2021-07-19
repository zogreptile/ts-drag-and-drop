import { BaseComponent } from './base';

import { Project } from '../classes/project';

import { autobind } from '../decorators/autobind';

import { Draggable } from '../interfaces/draggable';

export class ProjectItem extends BaseComponent<HTMLLIElement> implements Draggable {
  private projectTitleNode: HTMLElement;
  private projectSubtitleNode: HTMLElement;
  private projectDescriptionNode: HTMLElement;

  constructor(
    public data: Project,
    public rootNode: HTMLElement,
  ) {
    super('project-item', rootNode);

    this.projectTitleNode = this.html.querySelector('#project-title') as HTMLElement;
    this.projectSubtitleNode = this.html.querySelector('#project-subtitle') as HTMLElement;
    this.projectDescriptionNode = this.html.querySelector('#project-description') as HTMLElement;

    this.injectData();
    this.configure();
  }

  private injectData() {
    this.projectTitleNode.textContent = this.data.title;
    this.projectSubtitleNode.textContent = this.data.persons;
    this.projectDescriptionNode.textContent = this.data.description;
  }

  @autobind
  onDragStart(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.data.id.toString());
  }

  protected configure() {
    this.html.addEventListener('dragstart', this.onDragStart);
  }
}

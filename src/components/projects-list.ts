import { BaseComponent } from './base';
import { ProjectItem } from './project-item';

import { Project } from '../classes/project';
import { projectsStore } from '../classes/projects-store';

import { autobind } from '../decorators/autobind';

import { Droppable } from '../interfaces/droppable';


export enum ProjectsType {
  Active,
  Finished,
}

export class ProjectsListComponent extends BaseComponent<HTMLElement> implements Droppable {
  private projectsTitleNode: HTMLElement;
  private projectsListNode: HTMLElement;

  private projects: Project[] = [];

  constructor(
    public templateId: string,
    public rootNode: HTMLElement,
    private type: ProjectsType,
  ) {
    super(templateId, rootNode);

    this.projectsTitleNode = this.html.querySelector('#projects-title') as HTMLElement;
    this.projectsListNode = this.html.querySelector('#projects-list') as HTMLElement;

    this.configure();
  }

  @autobind
  private onStoreSubscription(projectItems: Project[]) {
    this.projects = projectItems.filter(proj => proj.type === this.type);
    this.renderItems();
  }

  @autobind
  onDragOver(event: DragEvent) {
    event.preventDefault();

    this.html.classList.add('projects_before-drop');
  }

  @autobind
  onDragLeave(_: DragEvent) {
    this.html.classList.remove('projects_before-drop');
  }

  @autobind
  onDrop(event: DragEvent) {
    const droppedProjectItemId: number = +event.dataTransfer!.getData('text/plain');
    const droppedProjectItem = this.projects.find((item) => item.id === droppedProjectItemId);

    if (droppedProjectItem?.type !== this.type) {
      projectsStore.toggleItemType(droppedProjectItemId);
    }
    
    this.html.classList.remove('projects_before-drop');
  }

  private renderItems() {
    this.projectsListNode.innerHTML = '';
    this.projects.forEach(proj => new ProjectItem(proj, this.projectsListNode));
  }

  protected configure() {
    const titles = {
      [ProjectsType.Active]: 'Active projects',
      [ProjectsType.Finished]: 'Finished projects',
    };

    this.projectsTitleNode.textContent = titles[this.type];

    this.html.addEventListener('dragover', this.onDragOver);
    this.html.addEventListener('dragleave', this.onDragLeave);
    this.html.addEventListener('drop', this.onDrop);

    projectsStore.subscribe(this.onStoreSubscription);
  }
}

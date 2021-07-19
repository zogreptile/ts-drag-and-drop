import { Store } from './store';
import { Project } from './project';

export class ProjectsStore extends Store<Project> {
  private static instance: ProjectsStore;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!ProjectsStore.instance) {
      ProjectsStore.instance = new ProjectsStore();
    }

    return ProjectsStore.instance;
  }

  toggleItemType(id: number) {
    const project = this.elements.find(item => item.id === id);

    if (project) {
      project.toggleType();
      this.broadcast();
    }
  }
}

export const projectsStore = ProjectsStore.getInstance();

import { FormComponent } from './components/form';
import { ProjectsListComponent, ProjectsType } from './components/projects-list';

const appNode = document.getElementById('app')! as HTMLElement;

new FormComponent('form-template', appNode);
new ProjectsListComponent('projects-template', appNode, ProjectsType.Active);
new ProjectsListComponent('projects-template', appNode, ProjectsType.Finished);

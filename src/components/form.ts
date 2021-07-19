import { BaseComponent } from './base';

import { Project } from '../classes/project';
import { projectsStore } from '../classes/projects-store';

import { autobind } from '../decorators/autobind';

import { isValid } from '../utils/is-valid';

export class FormComponent extends BaseComponent<HTMLFormElement> {
  private titleField: HTMLInputElement;
  private peopleField: HTMLInputElement;
  private descriptionField: HTMLInputElement;

  constructor(
    public templateId: string,
    public rootNode: HTMLElement,
  ) {
    super(templateId, rootNode);

    this.titleField = this.html.querySelector('#title-field') as HTMLInputElement;
    this.peopleField = this.html.querySelector('#people-field') as HTMLInputElement;
    this.descriptionField = this.html.querySelector('#description-field') as HTMLInputElement;
    
    this.configure();
  }

  private getFormValues(): [title: string, people: number, description: string] | [] {
    const title = this.titleField.value;
    const people: number = +this.peopleField.value;
    const description = this.descriptionField.value;
    
    if (
      isValid({ value: title, minLength: 3 }) &&
      isValid({ value: people, min: 1 }) &&
      isValid({ value: description, minLength: 5 })
    ) {
      return [title, people, description];
    }

    return [];
  }

  private resetForm() {
    this.html.reset();
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();

    const formValues = this.getFormValues();

    if (!formValues.length) {
      alert('Form validation error occurred!');
      return;
    }

    const project = new Project(...formValues);

    projectsStore.addItem(project);

    this.resetForm();
  }

  protected configure() {
    this.html.addEventListener('submit', this.submitHandler);
  }
}

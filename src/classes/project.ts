import { ProjectsType } from '../components/projects-list';

export class Project {
  public id: number;
  public type: ProjectsType;

  constructor(
    public title: string,
    public people: number,
    public description: string,
  ) {
    this.id = Date.now();
    this.type = ProjectsType.Active;
  }

  public get persons(): string {
    return this.people === 1
      ? `${this.people} person assigned`
      : `${this.people} persons assigned`
  }

  public toggleType() {
    this.type = this.type === ProjectsType.Active
      ? ProjectsType.Finished
      : ProjectsType.Active;
  }
}

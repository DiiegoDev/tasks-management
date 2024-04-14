import { randomUUID } from 'crypto';

// export type Status = 'Todo' | 'In Progress' | 'Done';
// export type Priority = 'Low' | 'Medium' | 'High';
// export type Label = 'Feature' | 'Bug' | 'Doc';

interface Props {
  id?: string;
  userId: string;
  title: string;
  label: string;
  status: string;
  priority: string;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Task {
  private props: Props;
  constructor(_props: Props) {
    this.props = {
      ..._props,
      id: _props.id ?? randomUUID(),
      createdAt: _props.createdAt ?? new Date(),
      updatedAt: _props.updatedAt ?? null,
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get title(): string {
    return this.props.title;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get label(): string {
    return this.props.label;
  }

  public set status(status: string) {
    this.props.status = status;
    this.update();
  }

  public get status(): string {
    return this.props.status;
  }

  public get priority(): string {
    return this.props.priority;
  }

  public get dueDate(): Date {
    return this.props.dueDate;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  public update() {
    this.props.updatedAt = new Date();
  }
}

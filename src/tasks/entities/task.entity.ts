import { randomUUID } from 'crypto';

export enum Type {
  Feature = 'Feature',
  Bug = 'Bug',
  Doc = 'Doc',
}

export enum Status {
  Todo = 'Todo',
  InProgress = 'In Progress',
  Done = 'Done',
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

interface Props {
  id?: string;
  userId: string;
  title: string;
  type: Type;
  status: Status;
  priority: Priority;
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

  public get type(): Type {
    return this.props.type;
  }

  public set status(status: Status) {
    this.props.status = status;
    this.update();
  }

  public get status(): Status {
    return this.props.status;
  }

  public get priority(): Priority {
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

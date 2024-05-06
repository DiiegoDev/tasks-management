import { randomUUID } from 'crypto';

type OptionalField = string | null;

interface Props {
  id?: string;
  name: string;
  email: string;
  password: string;
  picture?: OptionalField;
  createdAt?: Date;
}

export class User {
  private props: Props;

  constructor(_props: Props) {
    this.props = {
      id: _props.id ?? randomUUID(),
      name: _props.name,
      email: _props.email,
      picture: _props.picture ?? null,
      password: _props.password,
      createdAt: _props.createdAt ?? new Date(),
    };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get picture(): OptionalField {
    return this.props.picture;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

import { User } from 'src/users/entities/user.entity';

export abstract class IUserRepsoitory {
  abstract create(data: User): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}

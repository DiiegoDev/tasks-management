import { User } from '../entities/user.entity';

export class ControllerUsersMapper {
  static toModelView(data: User) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      createdAt: data.createdAt,
    };
  }
}

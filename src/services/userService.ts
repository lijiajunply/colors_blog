import { BaseService } from './baseService';
import { Prisma } from '../generated/prisma/client';

export class UserService extends BaseService<'User'> {
  constructor() {
    super('User');
  }

  async findByEmail(email: string, include?: Prisma.UserInclude) {
    return this.prisma.user.findUnique({
      where: { email },
      include,
    });
  }

  async createUser(data: Prisma.UserCreateInput, include?: Prisma.UserInclude) {
    return this.create(data, include);
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput, include?: Prisma.UserInclude) {
    return this.update(id, data, include);
  }

  async deleteUser(id: string) {
    return this.delete(id);
  }

  async getAllUsers(include?: Prisma.UserInclude) {
    return this.findAll(include);
  }

  async getUserById(id: string, include?: Prisma.UserInclude) {
    return this.findById(id, include);
  }
}

export const userService = new UserService();

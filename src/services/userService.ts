import type { Prisma } from "../generated/prisma/client";
import { BaseService } from "./baseService";

export class UserService extends BaseService<"User"> {
  constructor() {
    super("User");
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.create(data);
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    return this.update(id, data);
  }

  async deleteUser(id: string) {
    return this.delete(id);
  }

  async getAllUsers() {
    return this.findAll();
  }

  async getUserById(id: string) {
    return this.findById(id);
  }
}

export const userService = new UserService();

import { PrismaClient, Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export abstract class BaseService<T extends Prisma.ModelName> {
  protected prisma: PrismaClient;
  protected modelName: T;

  constructor(modelName: T) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  async findAll() {
    const model = (this.prisma as any)[this.modelName];
    const result = await model.findMany();
    return result;
  }

  async findById(id: string | number) {
    const model = (this.prisma as any)[this.modelName];
    const result = await model.findUnique({
      where: { id },
    });
    return result;
  }

  async create(data: any) {
    const model = (this.prisma as any)[this.modelName];
    const result = await model.create({
      data,
    });
    return result;
  }

  async update(id: string | number, data: any) {
    const model = (this.prisma as any)[this.modelName];
    const result = await model.update({
      where: { id },
      data,
    });
    return result;
  }

  async delete(id: string | number) {
    const model = (this.prisma as any)[this.modelName];
    const result = await model.delete({
      where: { id },
    });
    return result;
  }

  async findMany(where?: any) {
    const model = (this.prisma as any)[this.modelName];
    const result = await model.findMany({
      where,
    });
    return result;
  }
}

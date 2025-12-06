import { PrismaClient, Prisma } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';

export abstract class BaseService<T extends Prisma.ModelName> {
  protected prisma: PrismaClient;
  protected modelName: T;

  constructor(modelName: T) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  async findAll<Include extends Prisma.Subset<Prisma.Args<T, 'findMany'>['include'], Prisma.Args<T, 'findMany'>['include']>>(include?: Include) {
    const result = await (this.prisma[this.modelName] as any).findMany({
      include,
    });
    return result;
  }

  async findById<Include extends Prisma.Subset<Prisma.Args<T, 'findUnique'>['include'], Prisma.Args<T, 'findUnique'>['include']>>(id: string | number, include?: Include) {
    const result = await (this.prisma[this.modelName] as any).findUnique({
      where: { id },
      include,
    });
    return result;
  }

  async create<Data extends Prisma.Subset<Prisma.Args<T, 'create'>['data'], Prisma.Args<T, 'create'>['data']>, Include extends Prisma.Subset<Prisma.Args<T, 'create'>['include'], Prisma.Args<T, 'create'>['include']>>(data: Data, include?: Include) {
    const result = await (this.prisma[this.modelName] as any).create({
      data,
      include,
    });
    return result;
  }

  async update<Data extends Prisma.Subset<Prisma.Args<T, 'update'>['data'], Prisma.Args<T, 'update'>['data']>, Include extends Prisma.Subset<Prisma.Args<T, 'update'>['include'], Prisma.Args<T, 'update'>['include']>>(id: string | number, data: Data, include?: Include) {
    const result = await (this.prisma[this.modelName] as any).update({
      where: { id },
      data,
      include,
    });
    return result;
  }

  async delete(id: string | number) {
    const result = await (this.prisma[this.modelName] as any).delete({
      where: { id },
    });
    return result;
  }

  async findMany<Where extends Prisma.Subset<Prisma.Args<T, 'findMany'>['where'], Prisma.Args<T, 'findMany'>['where']>, Include extends Prisma.Subset<Prisma.Args<T, 'findMany'>['include'], Prisma.Args<T, 'findMany'>['include']>>(where?: Where, include?: Include) {
    const result = await (this.prisma[this.modelName] as any).findMany({
      where,
      include,
    });
    return result;
  }
}

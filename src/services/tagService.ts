import { BaseService } from './baseService';
import { Prisma } from '../generated/prisma/client';

export class TagService extends BaseService<'Tag'> {
  constructor() {
    super('Tag');
  }

  async createTag(data: Prisma.TagCreateInput, include?: Prisma.TagInclude) {
    return this.create(data, include);
  }

  async updateTag(id: number, data: Prisma.TagUpdateInput, include?: Prisma.TagInclude) {
    return this.update(id, data, include);
  }

  async deleteTag(id: number) {
    return this.delete(id);
  }

  async getAllTags(include?: Prisma.TagInclude) {
    return this.findAll(include);
  }

  async getTagById(id: number, include?: Prisma.TagInclude) {
    return this.findById(id, include);
  }

  async getTagByName(name: string, include?: Prisma.TagInclude) {
    return this.prisma.tag.findUnique({
      where: { name },
      include,
    });
  }
}

export const tagService = new TagService();

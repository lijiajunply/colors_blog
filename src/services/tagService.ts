import { BaseService } from './baseService';
import { Prisma } from '../generated/prisma/client';

export class TagService extends BaseService<'Tag'> {
  constructor() {
    super('Tag');
  }

  async createTag(data: Prisma.TagCreateInput) {
    return this.create(data);
  }

  async updateTag(id: number, data: Prisma.TagUpdateInput) {
    return this.update(id, data);
  }

  async deleteTag(id: number) {
    return this.delete(id);
  }

  async getAllTags() {
    return this.findAll();
  }

  async getTagById(id: number) {
    return this.findById(id);
  }

  async getTagByName(name: string) {
    return this.prisma.tag.findUnique({
      where: { name },
    });
  }
}

export const tagService = new TagService();

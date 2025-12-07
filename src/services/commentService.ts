import { BaseService } from './baseService';
import { Prisma } from '../generated/prisma/client';

export class CommentService extends BaseService<'Comment'> {
  constructor() {
    super('Comment');
  }

  async createComment(data: Prisma.CommentCreateInput) {
    return this.create(data);
  }

  async updateComment(id: number, data: Prisma.CommentUpdateInput) {
    return this.update(id, data);
  }

  async deleteComment(id: number) {
    return this.delete(id);
  }

  async getAllComments() {
    return this.findAll();
  }

  async getCommentById(id: number) {
    return this.findById(id);
  }

  async getCommentsByArticle(articleId: number) {
    return this.findMany({ articleId });
  }

  async getCommentsByAuthor(authorId: string) {
    return this.findMany({ authorId });
  }
}

export const commentService = new CommentService();

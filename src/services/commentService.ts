import { BaseService } from './baseService';
import { Prisma } from '../generated/prisma/client';

export class CommentService extends BaseService<'Comment'> {
  constructor() {
    super('Comment');
  }

  async createComment(data: Prisma.CommentCreateInput, include?: Prisma.CommentInclude) {
    return this.create(data, include);
  }

  async updateComment(id: number, data: Prisma.CommentUpdateInput, include?: Prisma.CommentInclude) {
    return this.update(id, data, include);
  }

  async deleteComment(id: number) {
    return this.delete(id);
  }

  async getAllComments(include?: Prisma.CommentInclude) {
    return this.findAll(include);
  }

  async getCommentById(id: number, include?: Prisma.CommentInclude) {
    return this.findById(id, include);
  }

  async getCommentsByArticle(articleId: number, include?: Prisma.CommentInclude) {
    return this.findMany({ articleId }, include);
  }

  async getCommentsByAuthor(authorId: string, include?: Prisma.CommentInclude) {
    return this.findMany({ authorId }, include);
  }
}

export const commentService = new CommentService();

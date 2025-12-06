import { BaseService } from './baseService';
import { Prisma } from '../generated/prisma/client';

export class ArticleService extends BaseService<'Article'> {
  constructor() {
    super('Article');
  }

  async createArticle(data: Prisma.ArticleCreateInput, include?: Prisma.ArticleInclude) {
    return this.create(data, include);
  }

  async updateArticle(id: number, data: Prisma.ArticleUpdateInput, include?: Prisma.ArticleInclude) {
    return this.update(id, data, include);
  }

  async deleteArticle(id: number) {
    return this.delete(id);
  }

  async getAllArticles(include?: Prisma.ArticleInclude) {
    return this.findAll(include);
  }

  async getArticleById(id: number, include?: Prisma.ArticleInclude) {
    return this.findById(id, include);
  }

  async getArticlesByAuthor(authorId: string, include?: Prisma.ArticleInclude) {
    return this.findMany({ authorId }, include);
  }
}

export const articleService = new ArticleService();

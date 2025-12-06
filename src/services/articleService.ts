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

  // 分页获取文章
  async getArticlesWithPagination(
    page: number = 1,
    pageSize: number = 10,
    include?: Prisma.ArticleInclude
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        skip,
        take,
        include,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.article.count(),
    ]);

    return {
      articles,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // 根据分类获取文章
  async getArticlesByCategory(
    category: string,
    include?: Prisma.ArticleInclude
  ) {
    return this.prisma.article.findMany({
      where: { category },
      include,
      orderBy: { createdAt: 'desc' },
    });
  }

  // 根据标签获取文章
  async getArticlesByTag(
    tagName: string,
    include?: Prisma.ArticleInclude
  ) {
    return this.prisma.article.findMany({
      where: {
        tags: {
          some: {
            name: tagName,
          },
        },
      },
      include,
      orderBy: { createdAt: 'desc' },
    });
  }

  // 搜索文章
  async searchArticles(
    keyword: string,
    include?: Prisma.ArticleInclude
  ) {
    return this.prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { content: { contains: keyword, mode: 'insensitive' } },
          { excerpt: { contains: keyword, mode: 'insensitive' } },
        ],
      },
      include,
      orderBy: { createdAt: 'desc' },
    });
  }

  // 获取热门文章
  async getPopularArticles(
    limit: number = 5,
    include?: Prisma.ArticleInclude
  ) {
    return this.prisma.article.findMany({
      take: limit,
      include,
      orderBy: { views: 'desc' },
    });
  }

  // 获取最新文章
  async getLatestArticles(
    limit: number = 5,
    include?: Prisma.ArticleInclude
  ) {
    return this.prisma.article.findMany({
      take: limit,
      include,
      orderBy: { createdAt: 'desc' },
    });
  }

  // 更新文章浏览量
  async incrementArticleViews(id: number) {
    return this.prisma.article.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }
}

export const articleService = new ArticleService();

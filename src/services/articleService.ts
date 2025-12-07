import { BaseService } from "./baseService";
import { Prisma } from "../generated/prisma/client";

export class ArticleService extends BaseService<"Article"> {
  constructor() {
    super("Article");
  }

  async createArticle(data: any) {
    return this.create(data);
  }

  async updateArticle(id: number, data: any) {
    return this.update(id, data);
  }

  async deleteArticle(id: number) {
    return this.delete(id);
  }

  async getAllArticles() {
    return this.findAll();
  }

  async getArticleById(id: number) {
    return this.findById(id);
  }

  async getArticlesByAuthor(authorId: string) {
    return this.findMany({ authorId });
  }

  // 分页获取文章
  async getArticlesWithPagination(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
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
  async getArticlesByCategory(category: string) {
    return this.prisma.article.findMany({
      where: { category },
      orderBy: { createdAt: "desc" },
    });
  }

  // 根据标签获取文章
  async getArticlesByTag(tagName: string) {
    return this.prisma.article.findMany({
      where: {
        tags: {
          some: {
            name: tagName,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  // 搜索文章
  async searchArticles(keyword: string) {
    return this.prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
          { excerpt: { contains: keyword, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  }

  // 获取热门文章
  async getPopularArticles(limit: number = 5) {
    return this.prisma.article.findMany({
      take: limit,
      orderBy: { views: "desc" },
    });
  }

  // 获取最新文章
  async getLatestArticles(limit: number = 5) {
    return this.prisma.article.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
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

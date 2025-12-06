import { BaseService } from './baseService';
import { Prisma } from '../generated/prisma/client';

export class ProjectService extends BaseService<'Project'> {
  constructor() {
    super('Project');
  }

  /**
   * 创建项目
   * @param data 项目数据
   * @param include 关联数据
   * @returns 创建的项目
   */
  async createProject(data: Prisma.ProjectCreateInput, include?: Prisma.ProjectInclude) {
    return this.create(data, include);
  }

  /**
   * 更新项目
   * @param id 项目ID
   * @param data 更新数据
   * @param include 关联数据
   * @returns 更新后的项目
   */
  async updateProject(id: number, data: Prisma.ProjectUpdateInput, include?: Prisma.ProjectInclude) {
    return this.update(id, data, include);
  }

  /**
   * 删除项目
   * @param id 项目ID
   * @returns 删除的项目
   */
  async deleteProject(id: number) {
    return this.delete(id);
  }

  /**
   * 获取所有项目
   * @param include 关联数据
   * @returns 项目列表
   */
  async getAllProjects(include?: Prisma.ProjectInclude) {
    return this.findAll(include);
  }

  /**
   * 根据ID获取项目
   * @param id 项目ID
   * @param include 关联数据
   * @returns 项目
   */
  async getProjectById(id: number, include?: Prisma.ProjectInclude) {
    return this.findById(id, include);
  }

  /**
   * 获取活跃项目
   * @param include 关联数据
   * @returns 活跃项目列表
   */
  async getActiveProjects(include?: Prisma.ProjectInclude) {
    return this.findMany({ isActive: true }, include);
  }

  /**
   * 获取非活跃项目
   * @param include 关联数据
   * @returns 非活跃项目列表
   */
  async getInactiveProjects(include?: Prisma.ProjectInclude) {
    return this.findMany({ isActive: false }, include);
  }

  /**
   * 根据标签获取项目
   * @param tag 标签名称
   * @param include 关联数据
   * @returns 包含该标签的项目列表
   */
  async getProjectsByTag(tag: string, include?: Prisma.ProjectInclude) {
    return this.prisma.project.findMany({
      where: {
        tags: {
          has: tag,
        },
      },
      include,
    });
  }

  /**
   * 分页获取项目
   * @param page 页码
   * @param pageSize 每页数量
   * @param include 关联数据
   * @returns 分页项目列表
   */
  async getProjectsWithPagination(
    page: number = 1,
    pageSize: number = 10,
    include?: Prisma.ProjectInclude
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        skip,
        take,
        include,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.project.count(),
    ]);

    return {
      projects,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /**
   * 搜索项目
   * @param keyword 搜索关键词
   * @param include 关联数据
   * @returns 搜索结果
   */
  async searchProjects(
    keyword: string,
    include?: Prisma.ProjectInclude
  ) {
    return this.prisma.project.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
        ],
      },
      include,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * 激活项目
   * @param id 项目ID
   * @param include 关联数据
   * @returns 激活后的项目
   */
  async activateProject(id: number, include?: Prisma.ProjectInclude) {
    return this.updateProject(id, { isActive: true }, include);
  }

  /**
   * 停用项目
   * @param id 项目ID
   * @param include 关联数据
   * @returns 停用后的项目
   */
  async deactivateProject(id: number, include?: Prisma.ProjectInclude) {
    return this.updateProject(id, { isActive: false }, include);
  }
}

export const projectService = new ProjectService();

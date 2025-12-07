import { BaseService } from "./baseService";
import { Prisma } from "../generated/prisma/client";

export class ProjectService extends BaseService<"Project"> {
  constructor() {
    super("Project");
  }

  /**
   * 创建项目
   * @param data 项目数据
   * @returns 创建的项目
   */
  async createProject(data: any) {
    return this.create(data);
  }

  /**
   * 更新项目
   * @param id 项目ID
   * @param data 更新数据
   * @returns 更新后的项目
   */
  async updateProject(id: number, data: any) {
    return this.update(id, data);
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
   * @returns 项目列表
   */
  async getAllProjects() {
    return this.findAll();
  }

  /**
   * 根据ID获取项目
   * @param id 项目ID
   * @returns 项目
   */
  async getProjectById(id: number) {
    return this.findById(id);
  }

  /**
   * 获取活跃项目
   * @returns 活跃项目列表
   */
  async getActiveProjects() {
    return this.findMany({ isActive: true });
  }

  /**
   * 获取非活跃项目
   * @returns 非活跃项目列表
   */
  async getInactiveProjects() {
    return this.findMany({ isActive: false });
  }

  /**
   * 根据标签获取项目
   * @param tag 标签名称
   * @returns 包含该标签的项目列表
   */
  async getProjectsByTag(tag: string) {
    return this.prisma.project.findMany({
      where: {
        tags: {
          has: tag,
        },
      },
    });
  }

  /**
   * 分页获取项目
   * @param page 页码
   * @param pageSize 每页数量
   * @returns 分页项目列表
   */
  async getProjectsWithPagination(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
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
   * @returns 搜索结果
   */
  async searchProjects(keyword: string) {
    return this.prisma.project.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * 激活项目
   * @param id 项目ID
   * @returns 激活后的项目
   */
  async activateProject(id: number) {
    return this.updateProject(id, { isActive: true });
  }

  /**
   * 停用项目
   * @param id 项目ID
   * @returns 停用后的项目
   */
  async deactivateProject(id: number) {
    return this.updateProject(id, { isActive: false });
  }
}

export const projectService = new ProjectService();

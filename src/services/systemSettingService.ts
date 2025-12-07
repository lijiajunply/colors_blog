import { BaseService } from "./baseService";
import { Prisma } from "../generated/prisma/client";

export class SystemSettingService extends BaseService<"SystemSetting"> {
  constructor() {
    super("SystemSetting");
  }

  /**
   * 创建系统设置
   * @param data 系统设置数据
   * @returns 创建的系统设置
   */
  async createSystemSetting(data: Prisma.SystemSettingCreateInput) {
    return this.create(data);
  }

  /**
   * 更新系统设置
   * @param id 系统设置ID
   * @param data 更新数据
   * @returns 更新后的系统设置
   */
  async updateSystemSetting(id: number, data: Prisma.SystemSettingUpdateInput) {
    return this.update(id, data);
  }

  /**
   * 删除系统设置
   * @param id 系统设置ID
   * @returns 删除的系统设置
   */
  async deleteSystemSetting(id: number) {
    return this.delete(id);
  }

  /**
   * 获取所有系统设置
   * @returns 系统设置列表
   */
  async getAllSystemSettings() {
    return this.findAll();
  }

  /**
   * 根据ID获取系统设置
   * @param id 系统设置ID
   * @returns 系统设置
   */
  async getSystemSettingById(id: number) {
    return this.findById(id);
  }

  /**
   * 根据键获取系统设置
   * @param key 系统设置键
   * @returns 系统设置
   */
  async getSystemSettingByKey(key: string) {
    return this.prisma.systemSetting.findUnique({
      where: { key },
    });
  }

  /**
   * 批量更新系统设置
   * @param settings 系统设置数组，包含key和value
   * @returns 更新结果
   */
  async updateSystemSettingsBatch(settings: { key: string; value: string }[]) {
    return Promise.all(
      settings.map(async (setting) => {
        // 先查找是否存在
        const existingSetting = await this.getSystemSettingByKey(setting.key);
        if (existingSetting) {
          // 如果存在则更新
          return this.updateSystemSetting(existingSetting.id, {
            value: setting.value,
          });
        } else {
          // 如果不存在则创建
          return this.createSystemSetting({
            key: setting.key,
            value: setting.value,
          });
        }
      }),
    );
  }

  /**
   * 获取系统设置值
   * @param key 系统设置键
   * @param defaultValue 默认值
   * @returns 系统设置值或默认值
   */
  async getSystemSettingValue(
    key: string,
    defaultValue: string = "",
  ): Promise<string> {
    const setting = await this.getSystemSettingByKey(key);
    return setting?.value || defaultValue;
  }
}

export const systemSettingService = new SystemSettingService();

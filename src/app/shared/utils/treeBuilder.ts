import { TreeNode } from 'primeng/api';

import { EntityMapper } from '../../core/domain/entityMapper';

export class TreeBuilder<T> {
  private readonly mapper: EntityMapper<T>;
  private readonly icon?: string;
  private readonly expandedIcon?: string;
  private readonly collapsedIcon?: string;

  constructor(
    mapper: EntityMapper<T>,
    options?: {
      icon?: string;
      expandedIcon?: string;
      collapsedIcon?: string;
    }
  ) {
    this.mapper = mapper;
    this.icon = options?.icon;
    this.expandedIcon = options?.expandedIcon;
    this.collapsedIcon = options?.collapsedIcon;
  }

  public build(entities: T[]): TreeNode<T>[] {
    if (!entities || entities.length === 0) return [];

    const groupedByParent: Map<string, T[]> = this.groupByParent(entities);
    return this.mapToNodes(null, groupedByParent);
  }

  private groupByParent(entities: T[]): Map<string, T[]> {
    const map = new Map<string, T[]>();
    for (const entity of entities) {
      const parentKey: string = String(
        this.mapper.getParentId(entity) ?? 'root'
      );
      if (!map.has(parentKey)) {
        map.set(parentKey, []);
      }
      map.get(parentKey)!.push(entity);
    }
    return map;
  }

  private mapToNodes(
    parentId: string | number | null,
    grouped: Map<string, T[]>
  ): TreeNode<T>[] {
    const children: T[] = grouped.get(String(parentId ?? 'root')) || [];
    return children.map((entity: T) => ({
      key: String(this.mapper.getId(entity)),
      label: this.mapper.getLabel(entity),
      data: entity,
      icon: this.icon ?? 'pi pi-folder',
      expandedIcon: this.expandedIcon ?? 'pi pi-folder-open',
      collapsedIcon: this.collapsedIcon ?? 'pi pi-folder',
      children: this.mapToNodes(this.mapper.getId(entity), grouped),
    }));
  }
}

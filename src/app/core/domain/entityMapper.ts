export interface EntityMapper<T> {
  getId(entity: T): number | string;
  getParentId(entity: T): number | string | null;
  getLabel(entity: T): string;
}

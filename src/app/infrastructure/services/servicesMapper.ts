import { EntityMapper } from '../../core/domain/entityMapper';
import { Service } from '../../core/domain/service.model';

export class ServiceMapper implements EntityMapper<Service> {
  getId(service: Service): number {
    return service.id!;
  }

  getParentId(service: Service): number | null {
    return service.parentId === 0 ? null : service.parentId;
  }

  getLabel(service: Service): string {
    return service.name;
  }
}

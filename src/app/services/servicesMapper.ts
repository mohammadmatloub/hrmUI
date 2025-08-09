import { EntityMapper } from "../models/entityMapper";
import { Service } from "../models/service.model";


export class ServiceMapper implements EntityMapper<Service> {
    getId(service: Service) {
        return service.id!;
    }
    getParentId(service: Service) {
        return service.parentId === 0 ? null : service.parentId;
    }
    getLabel(service: Service) {
        return service.name;
    }
}
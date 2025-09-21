import { Component, OnInit } from '@angular/core';

import { TreeModule } from 'primeng/tree';
import { Tree } from 'primeng/tree';
import { TreeNode } from 'primeng/api';

import { Service } from '../../../../core/domain/service.model';
import { ServiceService } from '../../../../infrastructure/services/service.service';
import { TreeBuilder } from '../../../../shared/utils/treeBuilder';
import { ServiceMapper } from '../../../../infrastructure/services/servicesMapper';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [Tree, TreeModule],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss',
})
export class ServiceList implements OnInit {
  services: Service[] = [];
  tree: TreeNode[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadYears();
  }

  loadYears(): void {
    this.serviceService.getAll().subscribe((services: Service[]): void => {
      const builder = new TreeBuilder(new ServiceMapper(), {
        icon: 'pi pi-eye',
      });
      this.tree = builder.build(services);
    });
  }
}

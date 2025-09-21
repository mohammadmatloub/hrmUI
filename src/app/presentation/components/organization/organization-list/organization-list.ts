import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';

import { Organization } from '../../../../core/domain/organization.model';
import { OrganizationService } from '../../../../infrastructure/services/organization.service';

@Component({
  selector: 'app-organization-list',
  imports: [TableModule],
  templateUrl: './organization-list.html',
  styleUrl: './organization-list.scss',
})
export class OrganizationList implements OnInit {
  organizations: Organization[] = [];

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.loadOrganizations();
  }

  loadOrganizations(): void {
    this.organizationService
      .getAll()
      .subscribe((organizationList: Organization[]): void => {
        this.organizations = organizationList;
      });
  }
}

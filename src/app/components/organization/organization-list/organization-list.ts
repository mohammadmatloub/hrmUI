import { Component,OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Organization } from '../../../models/organization.model';
import { OrganizationService } from '../../../services/organization.service';

@Component({
  selector: 'app-organization-list',
  imports: [TableModule],
  templateUrl: './organization-list.html',
  styleUrl: './organization-list.scss'
})
export class OrganizationList implements OnInit {
  organizations: Organization[] =[];

  constructor(private organizationService :OrganizationService){

  }

  ngOnInit(): void {
    this.loadOrganizations();
  }

  loadOrganizations():void{
    this.organizationService.getAll().subscribe(organizationList=>{
      this.organizations = organizationList;
    })
  }


}

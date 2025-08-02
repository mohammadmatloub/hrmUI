import { Component ,OnInit} from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../models/service.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-service-list',
  imports: [TableModule],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss'
})
export class ServiceList implements OnInit {
  services: Service[] =[];

  constructor(private serviceService :ServiceService){

  }

  ngOnInit(): void {
    this.loadYears();
  }

  loadYears():void{
    this.serviceService.getAll().subscribe(services=>{
      this.services = services;
    })
  }

}

import { Component ,OnInit} from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../models/service.model';
import { TreeModule  } from 'primeng/tree';
import { Tree  } from 'primeng/tree';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [Tree,TreeModule ],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss'
})
export class ServiceList implements OnInit {
  services: Service[] =[];
  tree: TreeNode[] =[];

  constructor(private serviceService : ServiceService){

  }

  ngOnInit(): void {
    this.loadYears();
    console.log(this.tree);
  }

  loadYears():void{
    this.serviceService.getAll().subscribe(services=>{
      this.tree = services;
    });
    console.log(this.tree);
  }

}

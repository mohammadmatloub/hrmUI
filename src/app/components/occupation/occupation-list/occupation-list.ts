import { Component,OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { Occupation } from '../../../models/occupation.model';
import { OccupationService } from '../../../services/occupation.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-occupation-list',
  imports: [TabsModule,TableModule],
  templateUrl: './occupation-list.html',
  styleUrl: './occupation-list.scss'
})
export class OccupationList implements OnInit {
  occupations: Occupation[] =[];

  constructor(private occupationService :OccupationService){

  }

  ngOnInit(): void {
    this.loadOccupation();
  }

  loadOccupation():void{
    this.occupationService.getAll().subscribe(occupationList=>{
      this.occupations = occupationList;
    })
  }

}

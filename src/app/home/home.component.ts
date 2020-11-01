import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Observable } from 'rxjs';
import { Tiketti } from '../tiketti';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faTrash = faTrashAlt;
  faEdit = faEdit;
  faRight = faArrowAltCircleRight;
  faLeft = faArrowAltCircleLeft;
  faQuestion = faQuestionCircle;

  Tiketti: any = [];
  Avoimet: any = [];
  Aloitetut: any = [];
  Valmiit: any = [];

  constructor(public crudService: CrudService, private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
   this.crudService.getAll().subscribe((data) => {
     this.Tiketti = data;
     console.log('kaikki ' + this.Tiketti);
     this.Avoimet = this.Tiketti.data.filter(t => t.tila === 'avoin');
     this.Aloitetut = this.Tiketti.data.filter(t => t.tila === 'aloitettu');
     this.Valmiit = this.Tiketti.data.filter(t => t.tila === 'valmis');
     });
   }

   poistaTiketti(id) {
      this.crudService.delete(id).subscribe(data => {
        console.log('poista');
        console.log(id);
        this.reloadData();
      });
   }

  //  muokkaaTikettiä(id) {
  //    this.crudService.update(id).subscribe(date => {
  //      console.log('muokkaa');
  //      console.log(id);
  //      this.reloadData();
  //    });
  //  }

   navigate(id) {
     this.router.navigate([`update/${id}`]);
   }

   muutaTila(id, tila) {
     this.crudService.getTiketti(id).subscribe(data => {
       this.Tiketti = data;
       this.Tiketti.tila = tila;
       this.crudService.update(id, this.Tiketti).subscribe(data1 => {
         this.reloadData();
       });
     });
   }

}

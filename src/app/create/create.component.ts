import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Tiketti } from '../tiketti';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

 tilat = [
   {nimi: 'avoin', label: 'Avoin'},
   {nimi: 'aloitettu', label: 'Aloitettu'},
   {nimi: 'valmis', label: 'Valmis'}
 ];

  tikettiForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router) {
      // this.tikettiForm = new FormGroup({
      //   nimi: new FormControl(null, Validators.required),
      //   tila: new FormControl(null, Validators.required),
      //   kuvaus: new FormControl(null, Validators.required)
      // });
  }

  ngOnInit() {

    this.tikettiForm = new FormGroup(
      {
        nimi : new FormControl(''),
        tila : new FormControl(''),
        kuvaus : new FormControl(''),
      },
    );
  }

  send() {
    this.crudService.create(this.tikettiForm.value)
      .subscribe(data => {
        console.log('tämä tulee frontista' + data);
        this.router.navigate(['']);
      });
  }

}

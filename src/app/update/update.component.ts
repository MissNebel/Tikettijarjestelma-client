import { Component, OnInit } from '@angular/core';
import { Tiketti } from '../tiketti';
import { CrudService } from '../crud.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  tikettiForm: FormGroup;
  tiketti: Tiketti;
  id: number;
  tilat = [
    {nimi: 'avoin', label: 'Avoin'},
    {nimi: 'aloitettu', label: 'Aloitettu'},
    {nimi: 'valmis', label: 'Valmis'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.tiketti = new Tiketti();
    this.tikettiForm = new FormGroup(
      {
        nimi : new FormControl(''),
        tila : new FormControl(''),
        kuvaus : new FormControl(''),
      },
    );

    // this.id = this.route.snapshot.params['id'];
    // this.id = this.route.snapshot.paramMap.get('id');

    // this.tikettiForm = this.formBuilder.group({
    //   nimi: '',
    //   tila: '',
    //   kuvaus: ''
    // });

    // this.tikettiForm = new FormGroup(
    //   {
    //     nimi : new FormControl(''),
    //     tila : new FormControl(''),
    //     kuvaus : new FormControl(''),
    //   },
    // );
    // this.tiketti = this.crudService.getTiketti(id).pipe(
    //   tap(tiketti => this.tikettiForm.patchValue(tiketti))
    // );
  }

  // send() {
  //   this.crudService.update(this.tikettiForm.value)
  //     .subscribe(data => {
  //       console.log('tämä tulee frontista' + data);
  //       this.router.navigate(['']);
  //     });
  // }

}

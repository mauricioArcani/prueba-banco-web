import { Client } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
})
export default class ClientFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private clientService = inject(ClientService);

  form?: FormGroup;

  client?: Client;
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientService.get(parseInt(id))
        .subscribe((client) => {
          this.client = client;
          this.form = this.fb.group({
            name: [client.name, [Validators.required]],
            firstLastName: [client.firstLastName, [Validators.required]],
            secondLastName: [client.secondLastName, [Validators.required]],
            documentType: [client.documentType, [Validators.required]],
            identityDocument: [client.identityDocument, [Validators.required]],
            birthdate: [client.birthdate, [Validators.required]],
            genre: [client.genre, [Validators.required]],
          });
      });
    } else{
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        firstLastName: ['', [Validators.required]],
        secondLastName: ['', [Validators.required]],
        documentType: ['', [Validators.required]],
        identityDocument: ['', [Validators.required]],
        birthdate: ['', [Validators.required]],
        genre: ['', [Validators.required]],
      });
    }
  }


  save() {
    if(this.form?.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const clientForm = this.form!.value;
    if(this.client){
      this.clientService.update(this.client.idClient, clientForm)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  
    }else{
      this.clientService.create(clientForm)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

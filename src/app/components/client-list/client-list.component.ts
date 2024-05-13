import { DatePipe } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Client } from '../../interfaces/client.interface';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export default class ClientListComponent implements OnInit{
  private clientService = inject(ClientService);

  clients: Client[] = [];

  ngOnInit(): void{
    this.loadAll();
  }

  loadAll() {
    this.clientService.list()
    .subscribe(clients => {
      this.clients = clients;
    });
  }

  deleteClient(client: Client) {
    this.clientService.delete(client.idClient)
    .subscribe(()=>{
      this.loadAll();
    })
  }


}

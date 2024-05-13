import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interfaces/account.interface';
import { Client } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export default class AccountListComponent implements OnInit{
  private accountService = inject(AccountService);
  private clientService = inject(ClientService);
  private route = inject(ActivatedRoute);

  

  accounts: Account[] = [];
  clientData?: Client;
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.loadAll(parseInt(id));
    }

  }

  loadAll(id : number) {
    this.accountService.list(id)
    .subscribe(accounts => {
      this.accounts = accounts;
      this.loadDataClient(id);
    })
  }

  loadDataClient(id: number){
    this.clientService.get(id)
    .subscribe( client => {
      this.clientData = client;
    });
  }

  deleteAccount(account: Account){
    const id = this.route.snapshot.paramMap.get('id');
    this.accountService.delete(account.idAccount)
    .subscribe(() =>{
      if(id){
        this.loadAll(parseInt(id));
      }
    });
  }
}

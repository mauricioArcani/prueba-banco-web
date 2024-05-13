import { routes } from '../../app.routes';
import { TransactionService } from '../../services/transaction.service';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interfaces/account.interface';
import { ClientService } from '../../services/client.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Client } from '../../interfaces/client.interface';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export default class TransactionListComponent implements OnInit{
  private clientService = inject(ClientService);
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);
  private route = inject(ActivatedRoute);

  transactions: any[] = [];
  clientData?: Client;
  accountData?: Account;

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if(id){
        this.loadData(parseInt(id));
      }
  }

  loadData(id: number){
    this.transactionService.list(id)
    .subscribe( transaction => {
      this.transactions = transaction;
      this.loadDataAccount(id);
      
    })
  }

  loadDataAccount(id: number){
    this.accountService.get(id)
    .subscribe( account => {
      this.accountData = account;
    });
  }
}

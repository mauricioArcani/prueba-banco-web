import { AccountService } from './../../services/account.service';
import { Account } from './../../interfaces/account.interface';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export default class TransactionFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private transactionService = inject(TransactionService);
  private accountService = inject(AccountService);
  accountData?: Account;
  idAccount: any;
  
  form = this.fb.group({
    amount: ['', [Validators.required]],
    current: ['', [Validators.required]],
    transactionType: ['', [Validators.required]] 
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.loadAccountData(parseInt(id));
    }
  }

  loadAccountData(id : number) {
    this.accountService.get(id)
    .subscribe(accounts => {
      this.accountData = accounts;
    })
  }

  create(){
    if(this.form?.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.idAccount = this.route.snapshot.paramMap.get('id');
    const transaction = this.form.value;
    this.transactionService.create(transaction, this.idAccount)
    .subscribe(() => {
      this.router.navigate(['/',this.idAccount,'transactions']);
    });

  }

}

import { AccountService } from '../../services/account.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Account } from '../../interfaces/account.interface';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export default class AccountFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private accountService = inject(AccountService);

  form?: FormGroup;
  idClient: any;
  account?: Account;
  ngOnInit(): void {
    const idAccount = this.route.snapshot.paramMap.get('id');
    const route = this.route.snapshot.url[1].path;
    
    if(route === 'editAccount'){
      if(idAccount) {
        this.accountService.get(parseInt(idAccount))
          .subscribe((account) => {
            this.account = account;
            this.form = this.fb.group({
              productType: [account.productType, [Validators.required]],
              numberAccount: [account.numberAccount, [Validators.required]],
              currency: [account.currency, [Validators.required]],
              amount: [account.amount, [Validators.required]],
              office: [account.office, [Validators.required]]
            });
          });
      }
    }
     else{
      this.idClient = this.route.snapshot.paramMap.get('id');
      this.form = this.fb.group({
        productType: ['', [Validators.required]],
        numberAccount: ['', [Validators.required]],
        currency: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        office: ['', [Validators.required]]      
      });
   }
  }

  save() {
    if(this.form?.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const accountForm = this.form!.value;
    if(this.account){
      this.accountService.update(this.account.idAccount, accountForm)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  
    }else{
      this.accountService.create(accountForm, this.idClient)
      .subscribe(() => {
        this.router.navigate(['/',this.idClient,'accounts']);
      });
    }
  }
}

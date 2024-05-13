import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Account } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  list(id: number){
    return this.http.get<Account[]>(`http://localhost:8080/api/v1/accounts/client/${id}`);
  }

  get(id: number){
    return this.http.get<Account>(`http://localhost:8080/api/v1/accounts/${id}`);
  }

  create(account: Account, idClient: number){
    return this.http.post<Account>(`http://localhost:8080/api/v1/accounts/${idClient}`, account);
  }

  update(id: number, account: Account){
    return this.http.put<Account>(`http://localhost:8080/api/v1/accounts/${id}`, account);
  }

  delete(id: number){
    return this.http.delete<void>(`http://localhost:8080/api/v1/accounts/${id}`);
  }
}

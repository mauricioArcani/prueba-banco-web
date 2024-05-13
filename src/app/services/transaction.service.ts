import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  
  list(id: number){
    return this.http.get<any[]>(`http://localhost:8080/api/v1/transactions/${id}`);
  }

  create(transaction: any, idAccount: number){
    return this.http.post<any>(`http://localhost:8080/api/v1/transactions/${idAccount}`, transaction);
  }
}


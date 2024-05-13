import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/client-list/client-list.component')
    },
    {
        path: 'new',
        loadComponent: () => import('./components/client-form/client-form.component')
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./components/client-form/client-form.component')
    },
    {
        path: ':id/accounts',
        loadComponent: () => import('./components/account-list/account-list.component')
    },
    {
        path: ':id/editAccount',
        loadComponent: () => import('./components/account-form/account-form.component')
    },
    {
        path: ':id/newAccount',
        loadComponent: () => import('./components/account-form/account-form.component')
    },
    {
        path: ':id/transactions',
        loadComponent: () => import('./components/transaction-list/transaction-list.component')
    },
    {
        path: ':id/newTransaction',
        loadComponent: () => import('./components/transaction-form/transaction-form.component')
    },


];

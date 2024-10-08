import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { PostsListComponent } from './feature/posts/posts-list/posts-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'posts',
    component: PostsListComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

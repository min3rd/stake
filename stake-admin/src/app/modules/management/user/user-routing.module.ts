import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolver, UsersResolver } from './user.resolver';
import { UserGuard } from './user.guard';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
        resolve: {
          UsersResolver: UsersResolver,
        },
        children: [
          {
            path: ':userId',
            canDeactivate: [UserGuard],
            component: UserDetailComponent,
            resolve: {
              UserResolver: UserResolver,
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

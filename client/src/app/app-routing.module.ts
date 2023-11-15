import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { AddAlbumComponent } from './add-album/add-album.component';
import { UpdateAlbumComponent } from './update-album/update-album.component';
import { SearchByLabelComponent } from './search-by-label/search-by-label.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeLabelsComponent } from './liste-labels/liste-labels.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AlbumGuard } from './album.guard';
import { UsersComponent } from './users/users.component';
import { AddRoleToUserComponent } from './add-role-to-user/add-role-to-user.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'albums', component: AlbumsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'searchByLabel', component: SearchByLabelComponent },
  { path: 'rechercheParNom', component: RechercheParNomComponent },
  { path: 'listeLabels', component: ListeLabelsComponent },
  {
    path: 'add-role-to-user/:id',
    component: AddRoleToUserComponent,
    canActivate: [AlbumGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'add-album',
    component: AddAlbumComponent,
    canActivate: [AlbumGuard],
  },
  {
    path: 'updateAlbum/:id',
    component: UpdateAlbumComponent,
    canActivate: [AlbumGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: '', redirectTo: 'albums', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

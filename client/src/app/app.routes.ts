import { Routes } from '@angular/router';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { AlbumNavListComponent } from './albums/album-nav-list/album-nav-list.component';
import { SongNavListComponent } from './songs/song-nav-list/song-nav-list.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'artists', component: ArtistListComponent },
    { path: 'albums', component: AlbumNavListComponent },
    { path: 'songs', component: SongNavListComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

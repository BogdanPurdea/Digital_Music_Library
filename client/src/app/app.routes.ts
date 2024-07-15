import { Routes } from '@angular/router';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { AlbumNavListComponent } from './albums/album-nav-list/album-nav-list.component';
import { SongNavListComponent } from './songs/song-nav-list/song-nav-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'artists', component: ArtistListComponent},
    {path: 'albums', component: AlbumNavListComponent},
    {path: 'songs', component: SongNavListComponent},
];

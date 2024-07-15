import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumNavListComponent } from './album-nav-list.component';

describe('AlbumNavListComponent', () => {
  let component: AlbumNavListComponent;
  let fixture: ComponentFixture<AlbumNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumNavListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

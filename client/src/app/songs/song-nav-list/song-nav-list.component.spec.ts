import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongNavListComponent } from './song-nav-list.component';

describe('SongNavListComponent', () => {
  let component: SongNavListComponent;
  let fixture: ComponentFixture<SongNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongNavListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

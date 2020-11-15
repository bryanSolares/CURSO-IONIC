import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfinitescrollPage } from './infinitescroll.page';

describe('InfinitescrollPage', () => {
  let component: InfinitescrollPage;
  let fixture: ComponentFixture<InfinitescrollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfinitescrollPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfinitescrollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

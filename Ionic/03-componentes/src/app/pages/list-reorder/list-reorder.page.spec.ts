import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListReorderPage } from './list-reorder.page';

describe('ListReorderPage', () => {
  let component: ListReorderPage;
  let fixture: ComponentFixture<ListReorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReorderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListReorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

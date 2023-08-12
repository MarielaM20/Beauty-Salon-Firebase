import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManicureComponent } from './manicure/manicure.component';
import { RouterModule } from '@angular/router';
import { MakeupComponent } from './makeup/makeup.component';
import { HaircutComponent } from './haircut/haircut.component';
import { HaircoloringComponent } from './haircoloring/haircoloring.component';
import { HairstylesComponent } from './hairstyles/hairstyles.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AppointmentMessageComponent } from './appointment-message/appointment-message.component';



@NgModule({
  declarations: [
    ManicureComponent,
    MakeupComponent,
    HaircutComponent,
    HaircoloringComponent,
    HairstylesComponent,
    PortfolioComponent,
    AppointmentMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'views/manicure',
        component: ManicureComponent
      }
    ])
  ],
  exports: [
    ManicureComponent,
    MakeupComponent,
    HaircutComponent,
    HaircoloringComponent,
    PortfolioComponent,
    AppointmentMessageComponent
  ]
})
export class ViewsModule { }

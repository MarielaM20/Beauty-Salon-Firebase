import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.activate";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";


const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Login',
            loginRequired: false
        }
    },
    {
        path: 'auth/register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Register',
            loginRequired: false
        }
    },
    {
        path: 'auth/logout',
        component: LogoutComponent,
        canActivate: [AuthGuard],
        data: {
            loginRequired: true
        }
    },
    {
        path: 'auth/profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Profile',
            loginRequired: true
        }
    }
];

export const AuthRoutingModule = RouterModule.forChild(routes);
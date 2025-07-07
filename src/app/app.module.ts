import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// Core

// config
import { MetaGuard } from 'wacom';
// guards
import { AdminsGuard } from './core/guards/admins.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		loadComponent: () =>
			import('./core/theme/guest/guest.component').then(
				(m) => m.GuestComponent
			),
		children: [
			/* guest */
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		loadComponent: () =>
			import('./core/theme/user/user.component').then(
				(m) => m.UserComponent
			),
		children: [
			/* user */
			{
				path: 'schools',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My schools'
					}
				},
				loadChildren: () =>
					import(
						'./modules/school/pages/schools/schools.module'
					).then((m) => m.SchoolsModule)
			},
			{
				path: 'courses',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My courses'
					}
				},
				loadChildren: () =>
					import(
						'./modules/school/pages/courses/courses.module'
					).then((m) => m.CoursesModule)
			},
			{
				path: 'lessons',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My lessons'
					}
				},
				loadChildren: () =>
					import(
						'./modules/school/pages/lessons/lessons.routes'
					).then((m) => m.lessonsRoutes)
			},
			{
				path: 'tests',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My tests'
					}
				},
				loadChildren: () =>
					import('./modules/school/pages/tests/tests.module').then(
						(m) => m.TestsModule
					)
			},
			{
				path: 'certificates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My certificates'
					}
				},
				loadChildren: () =>
					import(
						'./modules/school/pages/certificates/certificates.module'
					).then((m) => m.CertificatesModule)
			},
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			}
		]
	},
	{
		path: '',
		loadComponent: () =>
			import('./core/theme/public/public.component').then(
				(m) => m.PublicComponent
			),
		children: [
			/* user */
			{
				path: 'document',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Document'
					}
				},
				loadChildren: () =>
					import('./pages/guest/document/document.module').then(
						(m) => m.DocumentModule
					)
			},
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () =>
					import('./pages/guest/components/components.module').then(
						(m) => m.ComponentsModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		loadComponent: () =>
			import('./core/theme/user/user.component').then(
				(m) => m.UserComponent
			),
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/customform/pages/customforms/customforms.module'
					).then((m) => m.CustomformsModule)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule()
export class AppModule {}

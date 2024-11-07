import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
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
			},
			{
				path: 'test',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'test'
					}
				},
				loadChildren: () =>
					import('./pages/guest/test/test.module').then(
						(m) => m.TestModule
					)
			},
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
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'certificateProfile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'CertificateProfile'
					}
				},
				loadChildren: () => import('./pages/user/certificate-profile/certificate-profile.module').then(m => m.CertificateProfileModule)
			}, 
			{
				path: 'certificatesProfile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'CertificatesProfile'
					}
				},
				loadChildren: () => import('./pages/user/certificates-profile/certificates-profile.module').then(m => m.CertificatesProfileModule)
			}, 
			{
				path: 'testProfile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'TestProfile'
					}
				},
				loadChildren: () => import('./pages/user/test-profile/test-profile.module').then(m => m.TestProfileModule)
			}, 
			{
				path: 'lessonProfile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'LessonProfile'
					}
				},
				loadChildren: () => import('./pages/user/lesson-profile/lesson-profile.module').then(m => m.LessonProfileModule)
			}, 
			{
				path: 'courseProfile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'CourseProfile'
					}
				},
				loadChildren: () => import('./pages/user/course-profile/course-profile.module').then(m => m.CourseProfileModule)
			}, 
			{
				path: 'coursesProfile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'CoursesProfile'
					}
				},
				loadChildren: () => import('./pages/user/courses-profile/courses-profile.module').then(m => m.CoursesProfileModule)
			}, 
			{
				path: 'schoolsProfile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'SchoolsProfile'
					}
				},
				loadChildren: () => import('./pages/user/schools-profile/schools-profile.module').then(m => m.SchoolsProfileModule)
			}, 
			{
				path: 'dashboardStudent',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'DashboardStudent'
					}
				},
				loadChildren: () => import('./pages/user/dashboard-student/dashboard-student.module').then(m => m.DashboardStudentModule)
			}, 
			{
				path: 'dashboardTeacher',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'DashboardTeacher'
					}
				},
				loadChildren: () => import('./pages/user/dashboard-teacher/dashboard-teacher.module').then(m => m.DashboardTeacherModule)
			}, 
			{
				path: 'dashboardOwner',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'DashboardOwner'
					}
				},
				loadChildren: () => import('./pages/user/dashboard-owner/dashboard-owner.module').then(m => m.DashboardOwnerModule)
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
			},
			{
				path: 'schools',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Schools'
					}
				},
				loadChildren: () =>
					import('./modules/school/pages/schools/schools.module').then(
						(m) => m.SchoolsModule
					)
			},
			{
				path: 'courses',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Courses'
					}
				},
				loadChildren: () =>
					import('./modules/schoolcourse/pages/courses/courses.module').then(
						(m) => m.CoursesModule
					)
			},
			{
				path: 'lessons',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Lessons'
					}
				},
				loadChildren: () =>
					import('./modules/schoollesson/pages/lessons/lessons.module').then(
						(m) => m.LessonsModule
					)
			},
			{
				path: 'tests',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Tests'
					}
				},
				loadChildren: () =>
					import('./modules/schooltest/pages/tests/tests.module').then(
						(m) => m.TestsModule
					)
			},
			{
				path: 'certificates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Certificates'
					}
				},
				loadChildren: () =>
					import('./modules/schoolcertificate/pages/certificates/certificates.module').then(
						(m) => m.CertificatesModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
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

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: 'Web Art Work',
					titleSuffix: ' | Web Art Work',
					'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			},
			alert: {
				alerts: {
					/* alerts */
				}
			},
			loader: {
				loaders: {
					/* loaders */
				}
			},
			popup: {
				popups: {
					/* popups */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [AuthenticatedGuard, GuestGuard, AdminsGuard, { provide: LocationStrategy, useClass: HashLocationStrategy }],
	bootstrap: [AppComponent]
})
export class AppModule {}

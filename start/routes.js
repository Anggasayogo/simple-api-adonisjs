'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/api/student', 'StudentController.index').as('index')
Route.get('/api/student/:id', 'StudentController.show').as('show')
Route.post('/api/student', 'StudentController.store').as('store')
Route.patch('/api/student/', 'StudentController.update').as('update')
Route.delete('/api/student/:id', 'StudentController.destroy').as('destroy')



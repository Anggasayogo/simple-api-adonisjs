'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up() {
    this.create('students', (table) => {
      table.increments()
      table.string('nama', 100)
      table.string('email', 100)
      table.string('kelas', 100)
      table.string('nim', 255)
      table.string('jurusan', 100)
      table.timestamps()
    })
  }

  down() {
    this.drop('students')
  }
}

module.exports = StudentSchema

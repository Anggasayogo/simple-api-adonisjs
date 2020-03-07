'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const DB = use('Database')
const { validate } = use('Validator')
/**
 * Resourceful controller for interacting with students
 */
class StudentController {
  /**
   * Show a list of all students.
   * GET students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async index({ request, response, view }) {

    try {
      const respon = await DB.select('*').from('students')
      if (!respon) {
        response.status(500).json({
          status: false,
          data: "Internal Server Error!"
        })
      } else {
        response.status(200).json({
          status: true,
          data: respon
        })
      }
    } catch (error) {
      response.status(500).json({
        status: false,
        data: error.message
      })
    } finally {
      console.log('data suucces Tetload')
    }

  }

  /**
   * Create/save a new student.
   * POST students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const rules = {
      nama: 'required',
      email: 'required|email',
      kelas: 'required',
      nim: 'required',
      jurusan: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      response.status(400).json({
        status: false,
        data: "Bad Request!"
      })
    } else {
      const inserting = await DB.table('students').insert(request.all())
      if (inserting) {
        response.status(201).json({
          status: true,
          data: "Data Created"
        })
      } else {
        response.status(500).json({
          status: false,
          data: "Internal Server Error!"
        })
      }

    }
  }
  /**
   * Show student details.
   * Get students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async show({ params, request, response }) {
    const res = await DB.select('*')
      .from('students')
      .where('id', params.id)

    if (res != null) {
      response.status(200).json({
        status: true,
        data: res
      })
    } else {
      response.status(404).json({
        status: false,
        data: "Data Not Found!"
      })
    }


  }

  /**
   * Update student details.
   * PUT or PATCH students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const rules = {
      nama: 'required',
      email: 'required|email',
      kelas: 'required',
      nim: 'required',
      jurusan: 'required'
    }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      response.status(400).json({
        status: false,
        data: "Bad Request!"
      })
    } else {
      const updating = await Database
        .table('students')
        .where('id', request.post('id'))
        .update(request.all())
      if (updating) {
        response.status(201).json({
          status: true,
          data: "Data Updated!"
        })
      } else {
        response.status(500).json({
          status: false,
          data: "Internal Server Error!"
        })
      }
    }
  }

  /**
   * Delete a student with id.
   * DELETE students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const res = await DB.select('*')
      .from('students')
      .where('id', params.id)
      .delete()

    if (res) {
      response.status(200).json({
        status: true,
        data: "Data dengan Id " + params.id + " success deleted"
      })
    } else {
      response.status(400).json({
        status: false,
        data: "Bad Request !"
      })
    }
  }


}

module.exports = StudentController

// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import connection from '../database/connection'

export default {
  async index(req: Request, res: Response) {
    const ong_id = req.headers.authorization

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*')

    return res.json(incidents)
  },
}

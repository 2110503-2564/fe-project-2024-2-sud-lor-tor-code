import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
})

function runCors(req: NextApiRequest, res: NextApiResponse, next: Function) {
  cors(req, res, (result) => {
    if (result instanceof Error) {
      return res.status(500).json({ message: 'CORS Error' })
    }
    next()
  })
}

export default runCors

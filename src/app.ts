import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes'

class App {
  express: express.Application

  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(helmet())
  }

  private routes(): void {
    this.express.use(routes)
  }
}

export default new App().express

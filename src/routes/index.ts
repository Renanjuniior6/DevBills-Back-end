import { Router } from 'express'
import { baseRoute } from './base.route'
import { categoriesRoutes } from './categories.route'
import { transactionsRoutes } from './transactions.route'

export const routes = Router()

routes.use('/', baseRoute)
routes.use('/categories', categoriesRoutes)
routes.use('/transactions', transactionsRoutes)
import { Router } from 'express'

import packageJson from '../../package.json' 

export const baseRoute = Router()

baseRoute.get('/', (_, res) => {

    const { name, version, description, author } = packageJson

    res.status(200).json({name, version, description, author})
})










// Arquitetura do devbills: 
// ROUTE --> CONTROLLER --> SERVICE --> ENTITY
// ENTITY --> SERVICE --> CONTROLLER --> ROUTE
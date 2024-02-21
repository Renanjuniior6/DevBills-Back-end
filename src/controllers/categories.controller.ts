import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../services/categories.service";
import { CategoryRepository } from "../database/repositories/categories.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { CreateCategoryDTO } from "../dtos/categories.dtos";
import {z} from 'zod'
import { StatusCodes } from "http-status-codes";

export class CategoriesController {

    async create(req: Request<unknown, unknown, CreateCategoryDTO>, res: Response, next: NextFunction){
        
        try {

            const repository = new CategoryRepository(CategoryModel)

            const { title, color } = req.body

            const service = new CategoriesService( repository )

            const result = await service.create({ title, color })

            return res.status(StatusCodes.CREATED).json(result)
    
        } catch (err) {
            next(err)
        }
}
}
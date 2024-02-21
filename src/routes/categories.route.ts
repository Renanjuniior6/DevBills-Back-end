import { Router } from "express";
import { CategoriesController } from "../controllers/categories.controller";
import { ParamsType, validator } from "../middlewares/validator.middleware";
import { createCategorySchema } from "../dtos/categories.dtos";

export const categoriesRoutes = Router()

const controller = new CategoriesController()

categoriesRoutes.post("/", validator({
    schema: createCategorySchema,
    type: ParamsType.BODY
}), controller.create)
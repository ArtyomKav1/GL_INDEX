import { Router, Request, Response } from "express"
import { body, validationResult } from "express-validator"
import { inputValidationMiddleware } from "../midleware/input-validation-middleware"
import { coursesService } from "../domain/courses-service"





const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404

}


export const coursesRouter = Router()

const tilteValidation = body('title').trim().isLength({ min: 3, max: 10 }).withMessage("Title length should be from 3 to 10")


coursesRouter.get('/courses',
    tilteValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {


        const foundCourses = await coursesService.findProducts(req.query.title?.toString())
        res.json(foundCourses)


    })



coursesRouter.get('/courses/:id', async (req: Request, res: Response) => {
    const foundCourses = await coursesService.getProductsById(+req.params.id)
    if (!foundCourses) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.json(foundCourses)
})



coursesRouter.post('/courses',
    tilteValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        if (!req.body.title.trim()) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({ message: "Title is required" })
            return
        }
        const createCourses = await coursesService.createCourses(req.query.title)
        res.status(HTTP_STATUSES.CREATED_201).json(createCourses)
    })



coursesRouter.delete('/courses/:id', async (req: Request, res: Response) => {
    const completed = await coursesService.deleteCourses(+req.params.id)
    if (completed) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})



coursesRouter.put('/courses/:id', async (req: Request, res: Response) => {

    if (!req.body.title.trim()) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }


    const isUpdated = await coursesService.updateCourses(+req.params.id, req.body.title)

    if (isUpdated) {
        const updatedCourses = await coursesService.getProductsById(+req.params.id)
        res.json(updatedCourses)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

    }







})


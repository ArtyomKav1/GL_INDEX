import { productsRepository } from "../repositiries/courses-repository-db"










export const coursesService = {
    async findProducts(title: string | null | undefined) {
        return productsRepository.findProducts(title)
    },




    async createCourses(title: string) {
        const newCourses = {
            id: +(new Date()),
            title: title,
        }
        const createdCourses = productsRepository.createCourses(newCourses)
        return createdCourses
    },




    async getProductsById(id: number) {
        return productsRepository.getProductsById(id)
    },



    async updateCourses(id: number, title: string) {
        return productsRepository.updateCourses(id, title)
    },



    async deleteCourses(id: number) {
        return productsRepository.deleteCourses(id)
    }

}
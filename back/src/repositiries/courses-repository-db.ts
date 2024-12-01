import { coursesCollection } from "./db"


export type CoursesType = {
    id: number
    title: string
}

export const productsRepository = {
    async findProducts(title: string | null | undefined) {

        let filter: any = {}
        if (title) {
            filter.title = { $regex: title }
        }
        return coursesCollection.find(filter).toArray()

    },



    async createCourses(newCourses: CoursesType) {

        const result = await coursesCollection.insertOne(newCourses)
        return newCourses
    },



    async getProductsById(id: number) {
        const courses: CoursesType | null = await coursesCollection.findOne({ id: id })
        return courses
    },



    async updateCourses(id: number, title: string) {
        const result = await coursesCollection.updateOne({ id: id }, { $set: { title: title } })
        return result.matchedCount === 1


    },



    async deleteCourses(id: number) {
        const result = await coursesCollection.deleteOne({ id: id })
        return result.deletedCount === 1
    }

}
const db = {
    courses: [
        { id: 1, title: "frront" },
        { id: 2, title: "frad11111111sfsdfsadfsdfront" },
        { id: 3, title: "frrsdfsdfont" },
        { id: 4, title: "11111111111" },
    ]
}

export const productsRepository = {
    async findProducts(title: string | null | undefined) {
        if (title) {
            let filteredCourses = db.courses.filter(c => c.title.indexOf(title as string) > -1)
            return filteredCourses
        } else {
            return db.courses
        }
    },
    async createCourses(title: string) {

        const newCourses = {
            id: +(new Date()),
            title: title,
        }
        db.courses.push(newCourses)
        return newCourses
    },
    async getProductsById(id: number) {
        const foundCourses = db.courses.find((c => c.id === id))
        return foundCourses
    },
    async updateCourses(id: number, title: string) {
        const foundCourses = db.courses.find((c => c.id === id))
        if (foundCourses) {
            foundCourses.title = title
            return true
        } else {
            return false
        }


    },
    async deleteCourses(id: number) {
        const ind = db.courses.length
        db.courses = db.courses.filter((c => c.id !== id))
        if (ind === db.courses.length) {
            return false
        }
        return true
    }

}
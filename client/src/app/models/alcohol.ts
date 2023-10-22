import { Review } from "./review"

export interface Alcohol {
    _id: string
    name: string
    description: string
    type: string
    age: number
    alcohol_percentage: number
    price: number
    alcoholReviews: Review[]
}

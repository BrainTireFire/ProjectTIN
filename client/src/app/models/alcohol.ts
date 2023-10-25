import { Review } from "./review"

export interface Alcohol {
    _id: string
    name: string
    description: string
    type: string
    image: string
    age: number
    alcohol_percentage: number
    price: number
    alcoholReviews: Review[]
}

export interface AlcoholCreateForm {
    name: string
    description: string
    type: string
    image: string
    age: number
    alcohol_percentage: number
    price: number
    alcoholReviews: Review[]
}
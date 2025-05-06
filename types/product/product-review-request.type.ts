export interface ProductReviewRequest {
    productId: number
    rating: number
    reviewText: string
    imageFiles?:  File[]
  }
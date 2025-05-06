export interface ProductReviewResponse {
    id: number
    productId: number
    orderItemId: number
    productName: string
    userId: number
    reviewCount: number
    userName: string
    rating: number
    reviewText: string
    imageUrl: string 
    createdAt: string
  }
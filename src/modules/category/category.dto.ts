import { Post } from "../post/post.entity"

export class CategoryDto {
    readonly category: string
    readonly alias: string
    readonly posts: Post[]
}
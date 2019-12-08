import { Site } from "../site/site.entity"
import { Subject } from "../subject/subject.entity"

export class PostDto {
    readonly title: string
    readonly body: string
    readonly site: Site
    readonly subjects: Subject[] 
}
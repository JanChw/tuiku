import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectDto } from './subject.dto';

@Injectable()
export class SubjectService {
    constructor (
        @InjectRepository(Subject)
        private readonly subject: Repository<Subject>
    ) {}

    async index () {
        return await this.subject.find({
            relations: ['posts']
        })
    }

    async show (id: number) {
        return await this.subject.findOne(id, {
            relations: ['posts']
        })
    }

    async store (data: SubjectDto) {
        return await this.subject.save(data)
    }

    async createIfNotExist (subjects: Subject[]) {
        let allSubjects = await this.subject.find()
        let _allSubjects = allSubjects.length ? allSubjects.map(({ subject }) => subject) : []
        let subjectExist = allSubjects.filter(subjectObj => _allSubjects.includes(subjectObj.subject))
        let _subjectNotExist = subjects.filter(subjectObj => !_allSubjects.includes(subjectObj.subject))
        let subjectNotExist = await this.subject.save(_subjectNotExist)
        return [...subjectExist, ...subjectNotExist]
    }

    async update (id: number, data: SubjectDto) {
        return await this.subject.update(id, data)
    }

    async destroy (ids: number[]) {
        return await this.subject.delete(ids)
    }
}

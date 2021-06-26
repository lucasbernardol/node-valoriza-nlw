import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { TagsRepositories } from '../repositories/TagsRepositories';

export class ListTagsService {
  public async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tags = await tagsRepositories.find();

    const customTags = classToPlain(tags);

    return customTags;
  }
}

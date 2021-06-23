import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';

type Tag = {
  name: string;
};

export class CreateTagService {
  /**
   * @description Only admin users can create a new tag.
   */
  public async execute(tag: Tag) {
    const { name } = tag;

    if (!name) {
      throw new Error('Invalid or empty tag');
    }

    const tagName = name.trim();

    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tagExists = await tagsRepositories.findOne({
      name: tagName,
    });

    if (tagExists) {
      throw new Error('Conflict, invalid tag');
    }

    const tagInstance = tagsRepositories.create({
      name: tagName,
    });

    const createdTag = await tagsRepositories.save(tagInstance);

    return createdTag;
  }
}

import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';

export class DeleteTagsService {
  public async execute(id: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const { affected } = await tagsRepositories.delete(id);

    return {
      affected,
    };
  }
}

import { customAlphabet } from 'nanoid';
import { isEmpty, isNil, isNull, isNaN, isUndefined } from 'lodash';

export const isNilOrEmpty = (value: any) =>
  isNil(value) ||
  isEmpty(value) ||
  isNull(value) ||
  isNaN(value) ||
  isUndefined(value);

export const isPresent = (value: any) => !isNilOrEmpty(value);

export async function generateRandomSlug(model: any) {
  const generateSlug = customAlphabet(
    'abcdefghijklmnopqrstuvwxyz0123456789',
    3,
  );

  const MAX_TRY = 5;
  let slug = '';
  for (let i = 0; i < MAX_TRY; i++) {
    const id = `${generateSlug()}-${generateSlug()}-${generateSlug()}`;
    const data = await model.findOne({ where: { slug: id } });

    if (!data) {
      slug = id;
      break;
    }
  }

  return slug;
}

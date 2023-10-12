import { Entity } from '@backstage/catalog-model';

/** @public */
export const GITHUB_ACTIONS_ANNOTATION = 'github.com/project-slug';

export const getProjectNameFromEntity = (entity: Entity) =>
  entity?.metadata.annotations?.[GITHUB_ACTIONS_ANNOTATION] ?? '';
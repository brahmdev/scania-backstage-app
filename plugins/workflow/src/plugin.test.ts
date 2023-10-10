import { workflowPlugin } from './plugin';

describe('workflow', () => {
  it('should export plugin', () => {
    expect(workflowPlugin).toBeDefined();
  });
});

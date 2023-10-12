import mockEntity from './entity.mock';
import { getProjectNameFromEntity } from '../getProjectNameFromEntity';
 
let entity = mockEntity;

describe("getHostnameFromEntity", () => {
    it ("returns projectName when project slug is present inside entity", () => {
        const location = getProjectNameFromEntity(entity);
        expect(location).toEqual("brahmdev/scania-backstage/demo-web-app");
    })

    it ("returns empty projectName when project slug is not present inside entity", () => {
        entity = {
            ...entity,
            metadata: {
                ...entity.metadata,
                annotations: {
                    ...entity.metadata.annotations,
                    "github.com/project-slug": "",
                },
            }
        }
        const location = getProjectNameFromEntity(entity);
        expect(location).toEqual("");
    })
})

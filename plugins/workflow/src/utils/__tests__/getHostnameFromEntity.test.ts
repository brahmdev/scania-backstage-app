import mockEntity from './entity.mock';
import { getHostnameFromEntity } from '../getHostnameFromEntity';

let entity = mockEntity;

describe("getHostnameFromEntity", () => {
    it ("returns location when it starts with url: and source location is present in annotations", () => {
        const location = getHostnameFromEntity(entity);
        expect(location).toEqual("github.com");
    })

    it ("returns location when it does not starts with url:", () => {
        entity = {
            ...entity,
            metadata: {
                ...entity.metadata,
                annotations: {
                    ...entity.metadata.annotations,
                    "backstage.io/source-location": "",
                },
            }
        }
        const location = getHostnameFromEntity(entity);
        expect(location).toBeUndefined();
    })

    it ("returns location when it starts with url: and source location is not present in annotations", () => {
        entity = {
            ...entity,
            metadata: {
                ...entity.metadata,
                annotations: {
                    ...entity.metadata.annotations,
                    "backstage.io/source-location": "",
                },
            }
        }
        const location = getHostnameFromEntity(entity);
        expect(location).toBeUndefined();
    })
})
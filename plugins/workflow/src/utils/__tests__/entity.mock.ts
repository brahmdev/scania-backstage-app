import { Entity } from '@backstage/catalog-model';

const mockEntity: Entity = {
    "metadata": {
        "namespace": "default",
        "annotations": {
            "backstage.io/managed-by-location": "url:https://github.com/brahmdev/sample-create-react-app/tree/main/catalog-info.yml",
            "backstage.io/managed-by-origin-location": "url:https://github.com/brahmdev/sample-create-react-app/blob/main/data/all.yml",
            "backstage.io/view-url": "https://github.com/brahmdev/sample-create-react-app/tree/main/catalog-info.yml",
            "backstage.io/edit-url": "https://github.com/brahmdev/sample-create-react-app/edit/main/catalog-info.yml",
            "backstage.io/source-location": "url:https://github.com/brahmdev/sample-create-react-app/tree/main/",
            "github.com/project-slug": "brahmdev/scania-backstage/demo-web-app",
            "backstage.io/techdocs-ref": "dir:."
        },
        "name": "demo-web-app",
        "description": "Sample create-react-app project",
        "links": [
            {
                "url": "https://github.com/brahmdev/sample-create-react-app",
                "title": "Demo Web App",
                "icon": "code"
            }
        ],
        "uid": "c43c9ceb-fe99-405b-942f-ed8e6e45b158",
        "etag": "c2933c88b14d66822236d816a2353826526c529d"
    },
    "apiVersion": "backstage.io/v1alpha1",
    "kind": "Component",
    "spec": {
        "type": "website",
        "lifecycle": "development",
        "system": "scania-backstage",
        "owner": "demo-team",
        "consumesApis": [
            "iot-api"
        ]
    },
    "relations": [
        {
            "type": "consumesApi",
            "targetRef": "api:default/iot-api",
        },
        {
            "type": "ownedBy",
            "targetRef": "group:default/demo-team",
        },
        {
            "type": "partOf",
            "targetRef": "system:default/scania-backstage",
        }
    ]
}

export default mockEntity;
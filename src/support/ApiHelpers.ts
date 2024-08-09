import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiHelpers {
  public static async getSpaceIdByName(request: APIRequestContext, spaceName: string):Promise<string> {
    const apiKey: string = process.env.API_KEY as string;
    const teamId: string = process.env.BASE_TEAM_ID as string;
    const getSpacesEndpoint: string = `https://api.clickup.com/api/v2/team/${teamId}/space`;

    const getSpacesResponse: APIResponse = await request.get(getSpacesEndpoint, { headers: { Authorization: apiKey } });
    const spaceId: string = (await getSpacesResponse.json()).spaces.filter((space: { name: string; }) => space.name === spaceName)[0].id;

    return spaceId;
  }

  public static async deleteSpaceByName(request: APIRequestContext, spaceName: string) {
    const apiKey: string = process.env.API_KEY as string;

    const spaceId = await this.getSpaceIdByName(request, spaceName)
    const deleteSpaceEndpoint: string = `https://api.clickup.com/api/v2/space/${spaceId}`;

    await request.delete(deleteSpaceEndpoint, {
      headers: { Authorization: apiKey },
    });
  }

  public static async postSpaceByName(request: APIRequestContext, spaceName: string) {
    const apiKey: string = process.env.API_KEY as string;
    const teamId: string = process.env.BASE_TEAM_ID as string;
    const postSpaceEndpoint: string = `https://api.clickup.com/api/v2/team/${teamId}/space`;

    const newSpaceBody = {
      name: spaceName,
    };

    await request.post(postSpaceEndpoint, { headers: { Authorization: apiKey }, data: newSpaceBody });
  }

  public static async postDocByName(request: APIRequestContext, spaceName: string, docName: string) {
    const apiToken: string = await this.getApiToken(request);
    const endpoint: string = "https://prod-eu-west-1-3.clickup.com/docs/v1/view"

    const requestBody = {
      name: docName,
      parent: {
        id: await this.getSpaceIdByName(request, spaceName),
        type: 4
      },
      workspace_id: process.env.BASE_TEAM_ID,
      type: 9,
      sidebar_view: "true"
    }

    const resposne = await request.post(endpoint, { headers: { Authorization: `Bearer ${apiToken}` }, data: requestBody });
    console.log(await resposne.json())
  }

  public static async deleteDocsByName(request: APIRequestContext, docsName: string) {
    const apiToken: string = (await request.storageState()).origins[0].localStorage.filter(e => e.name === "id_token")[0].value;
    const endpoint: string = "https://prod-eu-west-1-3.clickup.com/viz/v1/view";

    await request.delete(endpoint, { headers: { Authorization: `Bearer ${apiToken}` }, data: { viewIds: (await this.getDocsIds(request, docsName))} })
  }

  public static async getDocsIds(request: APIRequestContext, docName: string) {
    const apiKey: string = process.env.API_KEY as string;
    const teamId: string = process.env.BASE_TEAM_ID as string;
    const getAllDocsEndpoint: string = `https://api.clickup.com/api/v3/workspaces/${teamId}/docs`;

    const getAllDocs: APIResponse = await request.get(getAllDocsEndpoint, { headers: { Authorization: apiKey } });
    const docsArray = (await getAllDocs.json()).docs.filter((doc: { name: string; }) => doc.name === docName);
    const docsId: string[] = docsArray.map((doc: { id: any; }) => doc.id)

    return docsId;
  }

  private static async getApiToken(request: APIRequestContext): Promise<string> {
    return (await request.storageState()).origins[0].localStorage.filter(e => e.name === "id_token")[0].value;
  }
}
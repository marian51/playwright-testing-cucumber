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
}
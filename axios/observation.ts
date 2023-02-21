import api from "./api";

const routeName = "/observation";

/**
 *
 * @returns all of observations from observations table
 */
export async function getAllobservations(): Promise<any> {
  const response = await api.get(routeName);
  return response.data;
}

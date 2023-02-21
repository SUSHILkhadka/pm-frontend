import api from "./api";

const routeName = "/practitioner";

/**
 *
 * @returns all of practitioners from practitioners table
 */
export async function getAllPractitioners(): Promise<any> {
  const response = await api.get(routeName);
  return response.data;
}

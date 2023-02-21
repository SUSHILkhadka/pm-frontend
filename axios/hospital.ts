import api from "./api";

const routeName = "/hospital";

/**
 *
 * @returns all of hospitals from hospitals table
 */
export async function getAllHospitals(): Promise<any> {
  const response = await api.get(routeName);
  return response.data;
}

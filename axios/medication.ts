import api from "./api";

const routeName = "/medication";

/**
 *
 * @returns all of medications from medications table
 */
export async function getAllMedications(): Promise<any> {
  const response = await api.get(routeName);
  return response.data;
}

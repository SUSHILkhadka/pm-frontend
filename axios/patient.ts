import api from "./api";

const routeName = "/patient";

/**
 *
 * @returns all of patients from patients table
 */
export async function getAllpatients(): Promise<any> {
  const response = await api.get(routeName);
  return response.data;
}

import axios from "axios";
import { COMICVINE_APIKEY } from "../../env.json";

export async function listComicVineVolumes(
  name: string,
  skip?: number
): Promise<any | null> {
  try {
    console.log(`Searching for ${name}...`);
    const filters = [];
    if (name) {
      filters.push(`name:${name}`);
    }

    const filter = filters.join(",");
    const url = `https://comicvine.gamespot.com/api/volumes/?api_key=${COMICVINE_APIKEY}&offset=${
      skip || 0
    }&format=json&filter=${filter}`;
    console.log(`Calling url = ${url}`);
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
  return null;
}

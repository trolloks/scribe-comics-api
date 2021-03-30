import axios from "axios";
import { COMICVINE_APIKEY } from "../../env.json";

export async function listComicVineVolumes(
  name?: string,
  id?: string,
  skip?: number
): Promise<any | null> {
  try {
    console.log(`Searching for ${name}...`);
    const filters = [];
    if (name) {
      filters.push(`name:${name}`);
    }

    if (id) {
      filters.push(`id:${id}`);
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

export async function listComicVineIssues(
  volume: string,
  number?: string,
  skip?: number
): Promise<any | null> {
  try {
    console.log(`Searching for issued from volume (${volume})...`);
    const filters = [];
    if (volume) {
      filters.push(`volume:${volume}`);
    }

    if (number) {
      filters.push(`issue_number:${number}`);
    }

    const filter = filters.join(",");
    const url = `https://comicvine.gamespot.com/api/issues/?api_key=${COMICVINE_APIKEY}&offset=${
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

import { listComicVineVolumes } from "../../gateway/comicvine/comicvine-gateway";
import { Volume } from "./volume-models";

const MAX_AMOUNT: number = 100;

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time || 1000);
  });
}

export async function listVolumes(
  name: string,
  year?: string,
  publisher?: string
): Promise<Volume[] | null> {
  var issuesResponse = await listComicVineVolumes(name);
  if (!issuesResponse.results) {
    return [];
  }
  let allResults: any[] = [];
  const { results, number_of_total_results } = issuesResponse;
  allResults = allResults.concat(results);
  let skip = MAX_AMOUNT;
  while (allResults.length < number_of_total_results) {
    console.log("sleeping ...");
    await sleep(2000);
    var newResponse = await listComicVineVolumes(name, skip);
    if (!newResponse.results) {
      break;
    }
    const { results: newResults } = newResponse;
    allResults = allResults.concat(newResults);
    skip += MAX_AMOUNT;
  }
  const comics: Volume[] = results.map((i: any) => ({
    name: i.name,
    start_year: i.start_year,
    count_of_issues: i.count_of_issues,
    comicvine_id: i.id,
    publisher: i.publisher && i.publisher.name,
  }));
  return comics.filter(
    (i) =>
      (!year || i.start_year === year) &&
      (!name || i.name.toLowerCase().trim() === name.toLowerCase().trim()) &&
      (!publisher ||
        (i.publisher &&
          i.publisher.toLowerCase().trim() === publisher.toLowerCase().trim()))
  );
}

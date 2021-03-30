import { listComicVineIssues } from "../../gateway/comicvine/comicvine-gateway";
import { Issue } from "./issue-models";
import * as volumeCore from "../volume/volume-core";
import { scrapeDownloadUrl } from "../../gateway/getcomics/getcomics-gateway";
import axios from "axios";

const MAX_AMOUNT: number = 100;

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time || 1000);
  });
}

export async function listIssues(
  volumeId: string,
  issueNumber: string
): Promise<Issue[] | null> {
  const volumes = await volumeCore.listVolumes(
    undefined,
    undefined,
    undefined,
    volumeId
  );
  if (!volumes) {
    return [];
  }

  if (issueNumber > volumes[0].count_of_issues) {
    console.warn("issue number out of bounds");
    return [];
  }

  const issuesResponse = await listComicVineIssues(volumeId, issueNumber);
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
    var newResponse = await listComicVineIssues(volumeId, issueNumber, skip);
    if (!newResponse.results) {
      break;
    }
    const { results: newResults } = newResponse;
    allResults = allResults.concat(newResults);
    skip += MAX_AMOUNT;
  }
  const comics: Issue[] = results.map((i: any) => ({
    comicvine_id: i.id,
    comicvine_volume_id: i.volume.id,
    number: i.issue_number,
    comicvine_url: i.site_detail_url,
    getcomics_url: `https://getcomics.info/${volumes[0].publisher.toLowerCase()}/${i.volume.name.toLowerCase()}-${
      i.issue_number
    }-${i.store_date.substr(0, 4)}`,
  }));

  for (let i = 0; i < comics.length; i++) {
    const downloadUrl = await scrapeDownloadUrl(comics[i].getcomics_url);
    comics[i].getcomics_download_url = downloadUrl;
    if (i < comics.length - 1) {
      await sleep(2000);
    }
  }
  return comics;
}

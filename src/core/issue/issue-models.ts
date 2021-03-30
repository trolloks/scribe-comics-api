import { swaggerClass, swaggerProperty } from "koa-swagger-decorator-trolloks";

@swaggerClass()
export class Issue {
  @swaggerProperty({ type: "string", required: true })
  comicvine_id: string;

  @swaggerProperty({ type: "string", required: true })
  comicvine_volume_id: string;

  @swaggerProperty({ type: "string", required: true })
  number: string;

  @swaggerProperty({ type: "string", required: true })
  comicvine_url: string;

  @swaggerProperty({ type: "string", required: true })
  getcomics_url: string;

  @swaggerProperty({ type: "string", required: true })
  getcomics_download_url: string;
}

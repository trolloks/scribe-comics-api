import { swaggerClass, swaggerProperty } from "koa-swagger-decorator-trolloks";

@swaggerClass()
export class Volume {
  @swaggerProperty({ type: "string", required: true })
  name: string;

  @swaggerProperty({ type: "string", required: true })
  start_year: string;

  @swaggerProperty({ type: "string", required: true })
  count_of_issues: string;

  @swaggerProperty({ type: "string", required: true })
  comicvine_id: string;

  @swaggerProperty({ type: "string", required: true })
  publisher: string;
}

import { SwaggerRouter } from "koa-swagger-decorator-trolloks";

export function configureSwaggerPlugin(router: SwaggerRouter) {
  // swagger docs avaliable at http://localhost:3000/api/v1/swagger-html
  router.swagger({
    title: "Scribe Comics",
    description: "API DOC",
    version: "1.0.0",

    // [optional] default is /swagger-html
    swaggerHtmlEndpoint: "/swagger",

    // [optional] default is /swagger-json
    swaggerJsonEndpoint: "/swagger-json",

    // [optional] additional options for building swagger doc
    // eg. add api_key as shown below
    swaggerOptions: {
      consumes: ["application/json", "text/plain"],
      produces: ["application/json"],
      securityDefinitions: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },

    swaggerConfiguration: {
      display: {
        defaultModelsExpandDepth: 4,
        defaultModelExpandDepth: 3,
        docExpansion: "list",
        defaultModelRendering: "example",
        showCommonExtensions: true,
        showExtensions: true,
      },
    },
  });
}

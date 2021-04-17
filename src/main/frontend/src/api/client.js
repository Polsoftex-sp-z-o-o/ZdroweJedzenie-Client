import rest from "rest";
import defaultRequest from "rest/interceptor/defaultRequest";
import mime from "rest/interceptor/mime";
import errorCode from "rest/interceptor/errorCode";
import baseRegistry from "rest/mime/registry";
import interceptor from "rest/interceptor";
const registry = baseRegistry.child();
registry.register("text/uri-list", require("./uriListConverter"));
registry.register(
  "application/hal+json",
  require("rest/mime/type/application/hal")
);

const client = rest
  .wrap(mime, { registry: registry })
  .wrap(
    interceptor({
      request: function (request /*, config, meta */) {
        /* If the URI is a URI Template per RFC 6570 (https://tools.ietf.org/html/rfc6570), trim out the template part */
        if (request.path.indexOf("{") === -1) {
          return request;
        } else {
          request.path = request.path.split("{")[0];
          return request;
        }
      },
    })
  )
  .wrap(errorCode)
  .wrap(defaultRequest, { headers: { Accept: "application/hal+json" } });

export default client;

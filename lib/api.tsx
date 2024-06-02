import { createPromiseClient, Interceptor } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";

import { TaskService } from "@buf/motiong-io_motiongapis.connectrpc_es/motiong/dataplatform/v1/services/task_connect";
import { UserService } from "@buf/motiong-io_motiongapis.connectrpc_es/motiong/dataplatform/v1/services/user_connect";
import { ProjectService } from "@buf/motiong-io_motiongapis.connectrpc_es/motiong/dataplatform/v1/services/project_connect";
import { MessageService } from "@buf/motiong-io_motiongapis.connectrpc_es/motiong/dataplatform/v1/services/message_connect";
import { FileService } from "@buf/motiong-io_motiongapis.connectrpc_es/motiong/dataplatform/v1/services/file_connect";
import { TaskActivityLogService } from "@buf/motiong-io_motiongapis.connectrpc_es/motiong/dataplatform/v1/services/task_activity_log_connect";
import { TopicService } from "@buf/motiong-io_motiongapis.connectrpc_es/motiong/dataplatform/v1/services/topic_connect";
import envConfig from "./env";

export {
  Topic,
  EnhancedTopic,
} from "@buf/motiong-io_motiongapis.bufbuild_es/motiong/dataplatform/v1/resources/topic_pb";
export { TaskActivityLog } from "@buf/motiong-io_motiongapis.bufbuild_es/motiong/dataplatform/v1/resources/task_activity_log_pb";
export { EnhancedTask as Task } from "@buf/motiong-io_motiongapis.bufbuild_es/motiong/dataplatform/v1/resources/task_pb";
export { User } from "@buf/motiong-io_motiongapis.bufbuild_es/motiong/dataplatform/v1/resources/user_pb";
export { Project } from "@buf/motiong-io_motiongapis.bufbuild_es/motiong/dataplatform/v1/resources/project_pb";
export { Message } from "@buf/motiong-io_motiongapis.bufbuild_es/motiong/dataplatform/v1/resources/message_pb";

export const Auth0Info = {
  token: "",
};
const interceptors: Interceptor[] = [
  // (next) => async (request) => {
  //   if (Auth0Info.token) {
  //     request.header.set("Authorization", `Bearer ${Auth0Info.token}`);
  //   }

  //   return next(request);
  // },
];
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // __CONNECT_WEB_DEVTOOLS__ is loaded in as a script, so it is not guaranteed to be loaded before your code.
  const interceptor =
    window.__CONNECT_WEB_DEVTOOLS__ !== "undefined"
      ? window.__CONNECT_WEB_DEVTOOLS__
      : null;
  if (interceptor) {
    interceptors.push(interceptor);
  }
  // To get around the fact that __CONNECT_WEB_DEVTOOLS__ might not be loaded, we can listen for a custom event,
  // and then push the interceptor to our array once loaded.
  window.addEventListener("connect-web-dev-tools-ready", () => {
    if (typeof window.__CONNECT_WEB_DEVTOOLS__ !== "undefined") {
      interceptors.push(window.__CONNECT_WEB_DEVTOOLS__);
    }
  });
}

// The transport defines what type of endpoint we're hitting.
// In our example we'll be communicating with a Connect endpoint.
// If your endpoint only supports gRPC-web, make sure to use
// `createGrpcWebTransport` instead.
const transport = createGrpcWebTransport({
  baseUrl: envConfig.apiHost,
  interceptors,
});

export const taskService = createPromiseClient(TaskService, transport);
export const userService = createPromiseClient(UserService, transport);
export const projectService = createPromiseClient(ProjectService, transport);
export const fileService = createPromiseClient(FileService, transport);
export const topicService = createPromiseClient(TopicService, transport);
export const messageService = createPromiseClient(MessageService, transport);
export const taskActivityLogService = createPromiseClient(
  TaskActivityLogService,
  transport
);

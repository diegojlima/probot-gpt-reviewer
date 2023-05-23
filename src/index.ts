import { Probot } from "probot";
import handlePullRequestOpened from "./events/handle-pull-request-opened";

export = (app: Probot) => {
  app.on(['pull_request.opened', 'pull_request.reopened'], handlePullRequestOpened);
}
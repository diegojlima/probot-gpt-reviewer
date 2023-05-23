import { Probot } from "probot";
import handlePullRequestOpened from "./events/handle-pull-request-opened";
import handleCommentCreated from "./events/handle-comment-created";

export = (app: Probot) => {
  app.on(['pull_request.opened', 'pull_request.reopened'], handlePullRequestOpened);
  app.on('issue_comment.created', handleCommentCreated);
}

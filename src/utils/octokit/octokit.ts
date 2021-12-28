import { Octokit } from "@octokit/rest";
import * as OctokitTypes from "@octokit/types";
import { Base64 } from "js-base64";
import sodium from "tweetsodium";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

type PublicKeyEndpoint =
  OctokitTypes.Endpoints["GET /repos/{owner}/{repo}/actions/secrets/public-key"];
type GetPublicKeyParameters = PublicKeyEndpoint["parameters"];
type GetPublicKeyResponse = Promise<PublicKeyEndpoint["response"]>;
type GetPublicKey = (options: GetPublicKeyParameters) => GetPublicKeyResponse;

/**
 * Fetch the public key for a repository
 *
 * @param   {GetPublicKeyParameters}  options
 * @returns  {GetPublicKeyResponse}
 */
export const getPublicKey: GetPublicKey = (options) =>
  octokit.actions.getRepoPublicKey(options);

type CreateOrUpdateARepositorySecretParameters =
  OctokitTypes.Endpoints["PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"]["parameters"] & {
    name: string;
    value: string;
  };
type CreateOrUpdateARepositorySecretResponse = Promise<
  OctokitTypes.Endpoints["PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"]["response"]
>;
type CreateOrUpdateARepositorySecret = (
  options: CreateOrUpdateARepositorySecretParameters
) => CreateOrUpdateARepositorySecretResponse;

/**
 * Creates a Secret for a respository.
 *
 * @example
 * const data = await createOrUpdateARepositorySecret({
 *    repo: 'hello-lambda-ci',
 *    name: 'SUPER_SECRET_VALUE',
 *    value: 'this-is-the-secret-value',
 * });
 * @param {*} {
 *   owner = 'okeeffed',
 *   repo,
 *   name,
 *   value,
 * }
 * @returns
 */
export const createOrUpdateARepositorySecret: CreateOrUpdateARepositorySecret =
  async ({ owner = "okeeffed", repo, name, value }) => {
    const { data } = await getPublicKey({ owner, repo });

    // Convert the message and key to Uint8Array's (Buffer implements that interface)
    const messageBytes = Buffer.from(value);
    const keyBytes = Buffer.from(data.key, "base64");

    // Encrypt using LibSodium.
    const encryptedBytes = sodium.seal(messageBytes, keyBytes);

    // Base64 the encrypted secret
    const encrypted = Buffer.from(encryptedBytes).toString("base64");

    return octokit.actions.createOrUpdateRepoSecret({
      owner,
      repo,
      encrypted_value: encrypted,
      secret_name: name,
      key_id: data.key_id,
    });
  };

type CreateOrUpdateFileContentsParameters =
  OctokitTypes.Endpoints["PUT /repos/{owner}/{repo}/contents/{path}"]["parameters"] & {
    committerName: string;
    committerEmail: string;
  };
type CreateOrUpdateFileContentsResponse = Promise<
  OctokitTypes.Endpoints["PUT /repos/{owner}/{repo}/contents/{path}"]["response"]
>;
type CreateOrUpdateFileContents = (
  options: CreateOrUpdateFileContentsParameters
) => CreateOrUpdateFileContentsResponse;

/**
 * Create or update file contents in a repository.
 *
 * @param {*} {
 *   owner = 'okeeffed',
 *   message = 'chore: adding in new files',
 *   committerName = `Dennis O'Keeffe`,
 *   committerEmail = `hello@dennisokeeffe.com`,
 *   repo,
 *   path,
 *   content,
 * }
 */
export const createOrUpdateFileContents: CreateOrUpdateFileContents = ({
  owner = "okeeffed",
  message = "chore: adding in new files",
  committerName = `Dennis O'Keeffe`,
  committerEmail = `hello@dennisokeeffe.com`,
  repo,
  path,
  content,
}) =>
  octokit.repos.createOrUpdateFileContents({
    // replace the owner and email with your own details
    owner: owner,
    repo: repo,
    path: path,
    message: message,
    content: Base64.encode(content),
    committer: {
      name: committerName,
      email: committerEmail,
    },
    author: {
      name: committerName,
      email: committerEmail,
    },
  });

type CreatePullRequestParameters =
  OctokitTypes.Endpoints["POST /repos/{owner}/{repo}/pulls"]["parameters"];
type CreatePullRequestResponse = Promise<
  OctokitTypes.Endpoints["POST /repos/{owner}/{repo}/pulls"]["response"]
>;
type CreatePullRequest = (
  options: CreatePullRequestParameters
) => CreatePullRequestResponse;

/**
 * Create a PR.
 *
 * @param {*} {
 *   owner = "okeeffed",
 *   base = "master",
 *   draft = true,
 *   title,
 *   head,
 *   repo,
 *   body,
 * }
 * @see https://octokit.github.io/rest.js/v18#pulls
 * @see https://developer.github.com/v3/pulls/#create-a-pull-request
 */
export const createPullRequest: CreatePullRequest = ({
  owner = "okeeffed",
  base = "master",
  draft = true,
  title,
  /* name of the branch */
  head,
  repo,
  body,
}) =>
  octokit.pulls.create({
    owner,
    repo,
    title,
    head,
    base,
    body,
    draft,
  });

type CreateUsingTemplateParameters = {
  template_owner: string;
  template_repo: string;
  owner?: string;
  name: string;
  description?: string;
  private?: boolean;
};

type CreateUsingTemplateResponse = Promise<
  OctokitTypes.Endpoints["POST /repos/{template_owner}/{template_repo}/generate"]["response"]
>;
type CreateUsingTemplate = (
  options: CreateUsingTemplateParameters
) => CreateUsingTemplateResponse;

/**
 * Create new repo using a template respository.
 *
 * @see https://developer.github.com/v3/repos/#create-a-repository-using-a-template
 * @see https://octokit.github.io/rest.js/v18#repos-create-using-template
 * @param   {CreateUsingTemplateParameters}  options
 * @returns  {CreateUsingTemplateResponse}
 */
export const createUsingTemplate: CreateUsingTemplate = (options) =>
  octokit.repos.createUsingTemplate(options);

type GetGitTreeEndpoint =
  OctokitTypes.Endpoints["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"];
type GetGitTreeParameters = GetGitTreeEndpoint["parameters"];
type GetGitTreeResponse = Promise<GetGitTreeEndpoint["response"]>;
type GetGitTree = (options: GetGitTreeParameters) => GetGitTreeResponse;

/**
 * Returns a single tree using the SHA1 value for that tree.
 *
 * @see https://docs.github.com/en/rest/reference/git#get-a-tree
 * @see https://octokit.github.io/rest.js/v18#git-get-tree
 * @param   {CreateUsingTemplateParameters}  options
 * @returns  {CreateUsingTemplateResponse}
 */
export const getGitTree: GetGitTree = (options) => octokit.git.getTree(options);

type GetCommitEndpoint =
  OctokitTypes.Endpoints["GET /repos/{owner}/{repo}/commits/{ref}"];
type GetCommitParameters = GetCommitEndpoint["parameters"];
type GetCommitResponse = Promise<GetCommitEndpoint["response"]>;
type GetCommit = (options: GetCommitParameters) => GetCommitResponse;

/**
 * Get commit based on meta
 *
 * @param {GetCommitParameters} options
 * @returns {GetCommitResponse}
 */
export const getCommit: GetCommit = (options) =>
  octokit.repos.getCommit(options);

type ListReposForAuthenticatedUserEndpoint =
  OctokitTypes.Endpoints["GET /user/repos"];
type ListReposForAuthenticatedUserParameters =
  ListReposForAuthenticatedUserEndpoint["parameters"];
type ListReposForAuthenticatedUserResponse = Promise<
  ListReposForAuthenticatedUserEndpoint["response"]
>;
type ListReposForAuthenticatedUserCommit = (
  options: ListReposForAuthenticatedUserParameters
) => ListReposForAuthenticatedUserResponse;

/**
 * Get content for file
 *
 * @param {ListReposForAuthenticatedUserParameters} options
 * @returns {ListReposForAuthenticatedUserResponse}
 */
export const listReposForAuthenticatedUser: ListReposForAuthenticatedUserCommit =
  (options) => octokit.repos.listForAuthenticatedUser(options);

type GetContentEndpoint =
  OctokitTypes.Endpoints["GET /repos/{owner}/{repo}/contents/{path}"];
type GetContentParameters = GetContentEndpoint["parameters"];
type GetContentResponse = Promise<GetContentEndpoint["response"]>;
type GetContent = (options: GetContentParameters) => GetContentResponse;

/**
 * Get repo for user
 *
 * @param {GetContentParameters} options
 * @returns {GetContentResponse}
 */
export const getContent: GetContent = (options) =>
  octokit.rest.repos.getContent(options);

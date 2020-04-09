/**
 * @typedef Issue
 * @type {object}
 * @property {Number} id issue id
 * @property {string} title issue title
 * @property {string} title issue description
 * @property {string?} assignee issue assignee
 * @property {string} status issue status
 * @property {Number[]?} subtasks array of issue ids that are subtasks of this issue
 */

/**
 * Returns the issue ID to be displayed for the current page from a query parameter 
 * called `id` (e.g. /index.html?id=5 returns 5)
 *
 * @returns Number
 */
export function getCurrentIssueId();

/**
 * Retrieves an issue by id
 *
 * @param {Number} id the issue id to retrieve
 * @returns {Promise<Issue>}
 */
export async function getIssue(id);

/**
 * Given an array of issue ids, return the issue objects for those ids
 *
 * @param {Number[]} ids the array of issue ids to retrieve
 * @returns {Promise<Issue[]>} array of issues
 */
export async function getIssues(ids);

/**
 * Updates the status of an issue by id
 *
 * @param {Number} id the issue id to update
 * @param {String} status the new status
 */
export async function updateStatus(id, status);
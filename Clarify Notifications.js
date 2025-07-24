// ==UserScript==
// @name         Clarify Notifications
// @namespace    http://tampermonkey.net/
// @version      2025-05-01
// @description  Clarify what a Github Notification is actually for
// @author       Christopher Bradshaw
// @match        https://github.com/notifications*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @require      https://gist.githubusercontent.com/kitsune7/cd317ed0bda4e96b81febaf11b188d6d/raw/685a67ba681e9914a7e1a3ca52b7d4fc42077c39/monkey-utils.js
// @grant        none
// ==/UserScript==

(function() {
  // Utils ref: https://gist.github.com/kitsune7/cd317ed0bda4e96b81febaf11b188d6d

  const notificationReasonMap = {
    assign: "You were assigned to the issue",
    author: "You created the thread",
    comment: "You commented on the thread",
    ci_activity: "A GitHub Actions workflow run that you triggered was completed",
    invitation: "You accepted an invitation to contribute to the repository",
    manual: "You subscribed to the thread (via an issue or pull request)",
    member_feature_requested: "Organization members have requested to enable a feature such as Copilot",
    mention: "You were specifically **@mentioned** in the content",
    review_requested: "You, or a team you're a member of, were requested to review a pull request",
    security_alert: "GitHub discovered a security vulnerability in your repository",
    security_advisory_credit: "You were credited for contributing to a security advisory",
    state_change: "You changed the thread state (for example, closing an issue or merging a pull request)",
    subscribed: "You're watching the repository",
    team_mention: "You were on a team that was mentioned",
  }

  setReadyHandler('.notification-list-item-actions', (targetElement) => {
    if (!document.querySelector('li.notifications-list-item .AvatarStack + span').title) {
      Array.from(document.querySelectorAll('li.notifications-list-item .AvatarStack + span')).forEach(target => {
        const notificationType = target.textContent.replaceAll(" ", "_")
        if (notificationType in notificationReasonMap) {
          target.title = notificationReasonMap[notificationType]
        }
      })
    }
  })
})();
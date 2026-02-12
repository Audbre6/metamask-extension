//========
// Messengers for teams are located in individual files.
//
// This file defines the messenger for the Assets team as well as the actions
// and events that this team governs.
//========

import { Messenger } from '@metamask/messenger';
import type { UIMessenger, UIMessengerEvents } from '../ui-messenger';

/**
 * Namespace for assets team messenger.
 */
export const ASSETS_TEAM_MESSENGER_NAMESPACE = 'AssetsTeam';

/**
 * Action types available to the assets team.
 */
const ALLOWED_ACTION_TYPES = [] as const;

/**
 * Event types available to the assets team.
 */
const ALLOWED_EVENT_TYPES = [
  'AccountTreeController:selectedAccountGroupChange',
] as const;

/**
 * Actions available to the assets team.
 */
type AssetsTeamMessengerActions = (typeof ALLOWED_ACTION_TYPES)[number];

/**
 * Events available to the assets team.
 */
type AssetsTeamMessengerEvents = Extract<
  UIMessengerEvents,
  { type: (typeof ALLOWED_EVENT_TYPES)[number] }
>;

/**
 * Type for the assets team messenger.
 */
type AssetsTeamMessenger = Messenger<
  typeof ASSETS_TEAM_MESSENGER_NAMESPACE,
  AssetsTeamMessengerActions,
  AssetsTeamMessengerEvents,
  UIMessenger
>;

/**
 * Creates a messenger for the assets team.
 *
 * @param uiMessenger - The parent UI messenger.
 * @returns A messenger with access to assets-related actions and events.
 */
export function createAssetsTeamMessenger(
  uiMessenger: UIMessenger,
): AssetsTeamMessenger {
  const assetsTeamMessenger = new Messenger<
    typeof ASSETS_TEAM_MESSENGER_NAMESPACE,
    AssetsTeamMessengerActions,
    AssetsTeamMessengerEvents,
    UIMessenger
  >({
    namespace: ASSETS_TEAM_MESSENGER_NAMESPACE,
    parent: uiMessenger,
  });

  uiMessenger.delegate({
    messenger: assetsTeamMessenger,
    actions: [...ALLOWED_ACTION_TYPES],
    events: [...ALLOWED_EVENT_TYPES],
  });

  return assetsTeamMessenger;
}

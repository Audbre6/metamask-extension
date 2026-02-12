//========
// This file defines the messenger for the Extension Platform team as well as
// the actions and events that this team governs.
//========

import { Messenger } from '@metamask/messenger';
import type {
  UIMessenger,
  UIMessengerActions,
  UIMessengerEvents,
} from '../ui-messenger';

/**
 * Namespace for extension platform team messenger.
 */
export const EXTENSION_PLATFORM_TEAM_MESSENGER_NAMESPACE =
  'ExtensionPlatformTeam';

/**
 * Action types available to the extension platform team.
 */
//========
// When a team wants to update the actions they have access to, they can update
// this list.
//========
const ALLOWED_ACTION_TYPES = [
  'BridgeController:trackUnifiedSwapBridgeEvent',
  'NetworkController:addNetwork',
] as const;

/**
 * Event types available to the extension platform team.
 */
//========
// When a team wants to update the events they have access to, they can update
// this list.
//========
const ALLOWED_EVENT_TYPES = ['KeyringController:unlock'] as const;

/**
 * Actions available to the extension platform team.
 */
type ExtensionPlatformTeamMessengerActions = Extract<
  UIMessengerActions,
  { type: (typeof ALLOWED_ACTION_TYPES)[number] }
>;

/**
 * Events available to the extension platform team.
 */
type ExtensionPlatformTeamMessengerEvents = Extract<
  UIMessengerEvents,
  { type: (typeof ALLOWED_EVENT_TYPES)[number] }
>;

/**
 * Type for the extension platform team messenger.
 */
type ExtensionPlatformTeamMessenger = Messenger<
  typeof EXTENSION_PLATFORM_TEAM_MESSENGER_NAMESPACE,
  ExtensionPlatformTeamMessengerActions,
  ExtensionPlatformTeamMessengerEvents,
  UIMessenger
>;

/**
 * Creates a messenger for the extension platform team.
 *
 * @param uiMessenger - The parent UI messenger.
 * @returns A messenger with access to extension platform-related actions and events.
 */
export function createExtensionPlatformTeamMessenger(
  uiMessenger: UIMessenger,
): ExtensionPlatformTeamMessenger {
  const extensionPlatformTeamMessenger = new Messenger<
    typeof EXTENSION_PLATFORM_TEAM_MESSENGER_NAMESPACE,
    ExtensionPlatformTeamMessengerActions,
    ExtensionPlatformTeamMessengerEvents,
    UIMessenger
  >({
    namespace: EXTENSION_PLATFORM_TEAM_MESSENGER_NAMESPACE,
    parent: uiMessenger,
  });

  uiMessenger.delegate({
    messenger: extensionPlatformTeamMessenger,
    actions: [...ALLOWED_ACTION_TYPES],
    events: [...ALLOWED_EVENT_TYPES],
  });

  return extensionPlatformTeamMessenger;
}

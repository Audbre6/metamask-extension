//========
// This file defines the team messenger registry. Messengers in this registry
// are used to define parents for route-based messengers.
//
//   UI Messenger -> Team Messenger -> Route Messenger
//
// When a team is added, removed, or renamed, this file will need to be changed.
//========

import type { UIMessenger } from './ui-messenger';
import {
  ASSETS_TEAM_MESSENGER_NAMESPACE,
  createAssetsTeamMessenger,
} from './team-messengers/assets';
import {
  SWAPS_AND_BRIDGE_TEAM_MESSENGER_NAMESPACE,
  createSwapsAndBridgeTeamMessenger,
} from './team-messengers/swapsAndBridge';
import {
  EXTENSION_PLATFORM_TEAM_MESSENGER_NAMESPACE,
  createExtensionPlatformTeamMessenger,
} from './team-messengers/extensionPlatform';

/**
 * A union of all team messenger namespaces.
 */
// Technically this type is used by `TeamMessenger`, but we put it in this file
// so that when updating teams we only have one place to go.
export type TeamMessengerNamespace =
  | typeof ASSETS_TEAM_MESSENGER_NAMESPACE
  | typeof SWAPS_AND_BRIDGE_TEAM_MESSENGER_NAMESPACE
  | typeof EXTENSION_PLATFORM_TEAM_MESSENGER_NAMESPACE;

/**
 * Creates the team messenger registry.
 *
 * @param uiMessenger - The parent UI messenger.
 * @returns A registry containing all team messengers.
 */
export function createTeamMessengerRegistry(uiMessenger: UIMessenger) {
  return {
    assetsTeam: createAssetsTeamMessenger(uiMessenger),
    swapsAndBridgeTeam: createSwapsAndBridgeTeamMessenger(uiMessenger),
    extensionPlatformTeam: createExtensionPlatformTeamMessenger(uiMessenger),
  };
}

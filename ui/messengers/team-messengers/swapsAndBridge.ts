//========
// This file defines the messenger for the Swaps/Bridge team as well as
// the actions and events that this team governs.
//========

import { Messenger } from '@metamask/messenger';
import type { UIMessenger, UIMessengerActions } from '../ui-messenger';

/**
 * Namespace for swaps and bridge team messenger.
 */
export const SWAPS_AND_BRIDGE_TEAM_MESSENGER_NAMESPACE = 'SwapsAndBridgeTeam';

/**
 * Action types available to the swaps and bridge team.
 */
const ALLOWED_ACTION_TYPES = [
  'BridgeController:trackUnifiedSwapBridgeEvent',
] as const;

/**
 * Event types available to the swaps and bridge team.
 */
const ALLOWED_EVENT_TYPES = [] as const;

/**
 * Actions available to the swaps and bridge team.
 */
type SwapsAndBridgeTeamMessengerActions = Extract<
  UIMessengerActions,
  { type: (typeof ALLOWED_ACTION_TYPES)[number] }
>;

/**
 * Events available to the swaps and bridge team.
 */
type SwapsAndBridgeTeamMessengerEvents = (typeof ALLOWED_EVENT_TYPES)[number];

/**
 * Type for the swaps and bridge team messenger.
 */
type SwapsAndBridgeTeamMessenger = Messenger<
  typeof SWAPS_AND_BRIDGE_TEAM_MESSENGER_NAMESPACE,
  SwapsAndBridgeTeamMessengerActions,
  SwapsAndBridgeTeamMessengerEvents,
  UIMessenger
>;

/**
 * Creates a messenger for the swaps and bridge team.
 *
 * @param uiMessenger - The parent UI messenger.
 * @returns A messenger with access to swap and bridge-related actions and events.
 */
export function createSwapsAndBridgeTeamMessenger(
  uiMessenger: UIMessenger,
): SwapsAndBridgeTeamMessenger {
  const swapsAndBridgeTeamMessenger = new Messenger<
    typeof SWAPS_AND_BRIDGE_TEAM_MESSENGER_NAMESPACE,
    SwapsAndBridgeTeamMessengerActions,
    SwapsAndBridgeTeamMessengerEvents,
    UIMessenger
  >({
    namespace: SWAPS_AND_BRIDGE_TEAM_MESSENGER_NAMESPACE,
    parent: uiMessenger,
  });

  uiMessenger.delegate({
    messenger: swapsAndBridgeTeamMessenger,
    actions: [...ALLOWED_ACTION_TYPES],
    events: [...ALLOWED_EVENT_TYPES],
  });

  return swapsAndBridgeTeamMessenger;
}

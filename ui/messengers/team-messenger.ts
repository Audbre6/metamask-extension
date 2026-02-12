//========
// This file defines the type for all team messengers.  Team messengers serve
// are used to define parents for route-based messengers:
//
//   UI Messenger -> Team Messenger -> Route Messenger
//========

import {
  Messenger,
  ActionConstraint,
  EventConstraint,
} from '@metamask/messenger';
import type {
  UIMessenger,
  UIMessengerActions,
  UIMessengerEvents,
} from './ui-messenger';
import { TeamMessengerNamespace } from './team-messenger-registry';

/**
 * A messenger that represents a team.
 *
 * This type is intentionally generic (a bit unusual for messenger "instance"
 * types) because each route gets its own messenger (the "team messenger" isn't
 * a singleton as is the case for controllers and services).
 */
export type TeamMessenger<
  Namespace extends TeamMessengerNamespace = TeamMessengerNamespace,
  Actions extends ActionConstraint = UIMessengerActions,
  Events extends EventConstraint = UIMessengerEvents,
> = Messenger<Namespace, Actions, Events, UIMessenger>;

//========
// This file defines a context which provides access to the team messenger
// registry throughout the React hierarchy. The registry contains messengers for
// each team (e.g., assets, swaps and bridge, extension platform, etc.).
// When defining the messenger for a route, these team messengers can be used as
// parents.
//========

import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import {
  TeamMessengerRegistry,
  createTeamMessengerRegistry,
} from '../messengers/team-messenger-registry';
import { useUIMessenger } from './ui-messenger';

/**
 * Context that holds the team messenger registry.
 */
export const TeamMessengerRegistryContext =
  createContext<TeamMessengerRegistry | null>(null);

/**
 * Provides the team messenger registry to child components via context.
 *
 * This component creates the registry by deriving team messengers from the
 * UI messenger. It should be placed after UIMessengerProvider in the component
 * tree.
 *
 * @param args - The arguments to this function.
 * @param args.children - The components to wrap.
 */
export const TeamMessengerRegistryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const uiMessenger = useUIMessenger();

  const registry = useMemo(() => {
    if (!uiMessenger) {
      return null;
    }
    return createTeamMessengerRegistry(uiMessenger);
  }, [uiMessenger]);

  return (
    <TeamMessengerRegistryContext.Provider value={registry}>
      {children}
    </TeamMessengerRegistryContext.Provider>
  );
};

/**
 * Hook to access the team messenger registry from context.
 *
 * Used when defining routes to select which team's messenger should be the
 * parent for the route messenger.
 *
 * @returns The team messenger registry.
 * @throws If the registry is not available (e.g., hook is used outside of the
 * provider or UI messenger is not yet set).
 */
export function useTeamMessengerRegistry(): TeamMessengerRegistry {
  const registry = useContext(TeamMessengerRegistryContext);

  if (!registry) {
    throw new Error(
      'useTeamMessengerRegistry must be used within a TeamMessengerRegistryProvider ' +
        'and after the UI messenger has been initialized',
    );
  }

  return registry;
}

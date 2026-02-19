import type { Migrate } from './types';

/**
 * The version number of this migration.
 */
export const version = 196;

type GatorPermissionsControllerStateV1 = {
  gatorPermissionsMapSerialized?: string;
  isGatorPermissionsEnabled?: boolean;
  gatorPermissionsProviderSnapId?: string;
};

/**
 * Removes legacy state from GatorPermissionsController 1.x.x
 * - `gatorPermissionsMapSerialized` was cached data only.
 * - `isGatorPermissionsEnabled` was set on controller initialization, so never needed to be persisted.
 * - `gatorPermissionsProviderSnapId` was set on controller initialization, so never needed to be persisted.
 * @param versionedData - Versioned MetaMask extension state; what we persist to disk.
 * @param versionedData.meta - Metadata about the state being migrated.
 * @param versionedData.meta.version - The current state version.
 * @param versionedData.meta.storageKind - The kind of storage being used.
 * @param versionedData.data - The persisted MetaMask state, keyed by controller.
 * @param changedKeys - `Set` to track which controller keys were modified by a migration
 */
export const migrate = (async (versionedData, changedKeys) => {
  versionedData.meta.version = version;
  // if your `transformState` is async, you must `await` it, if it is not async,
  // don't `await` it.
  transformState(versionedData.data, changedKeys);
}) satisfies Migrate;

function transformState(
  state: Record<string, unknown>,
  changedKeys: Set<string>,
): Promise<void> | void {

  if (!state.GatorPermissionsController) {
    return;
  }

  const GatorPermissionsController  = state.GatorPermissionsController as GatorPermissionsControllerStateV1;

  delete GatorPermissionsController.gatorPermissionsMapSerialized;
  delete GatorPermissionsController.isGatorPermissionsEnabled;
  delete GatorPermissionsController.gatorPermissionsProviderSnapId;

  changedKeys.add('gatorPermissionsMapSerialized');
  changedKeys.add('isGatorPermissionsEnabled');
  changedKeys.add('gatorPermissionsProviderSnapId');
}

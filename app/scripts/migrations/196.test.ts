import { migrate, version } from './196';
import { cloneDeep } from 'lodash';

const VERSION = version;
const OLD_VERSION = VERSION - 1;

describe('storage is migrated successfully', () => {
  const oldStorage = {
    meta: { version: OLD_VERSION },
    data: {
      GatorPermissionsController: {
        gatorPermissionsMapSerialized: 'foo',
        isGatorPermissionsEnabled: true,
        gatorPermissionsProviderSnapId: 'bar',
        pendingRevocations: [],
      },
    },
  };

  it('removes the legacy v1 keys', async () => {
    const changedKeys = new Set<string>();
    const versionedData = cloneDeep(oldStorage);

    await migrate(versionedData, changedKeys);

    expect(versionedData.meta.version).toStrictEqual(version);

    const {
      GatorPermissionsController: gatorPermissionsControllerMigratedState,
    } = versionedData.data;

    expect(gatorPermissionsControllerMigratedState).toStrictEqual({
      pendingRevocations: [],
    });

    expect(changedKeys).toStrictEqual(
      new Set([
        'gatorPermissionsMapSerialized',
        'isGatorPermissionsEnabled',
        'gatorPermissionsProviderSnapId',
      ]),
    );
  });

  it('returns the same state if the GatorPermissionsController is not present', async () => {
    const changedKeys = new Set<string>();
    const versionedData = cloneDeep(oldStorage);

    await migrate(versionedData, changedKeys);
  });

  it('successfully migrates even if individual keys are missing', async () => {
    const oldStorage = {
      meta: { version: OLD_VERSION },
      data: {
        GatorPermissionsController: {
          pendingRevocations: [],
        },
      },
    };

    const versionedData = cloneDeep(oldStorage);
    const changedKeys = new Set<string>();

    await migrate(versionedData, changedKeys);

    expect(versionedData.meta.version).toStrictEqual(version);

    const {
      GatorPermissionsController: gatorPermissionsControllerMigratedState,
    } = versionedData.data;

    expect(gatorPermissionsControllerMigratedState).toStrictEqual({
      pendingRevocations: [],
    });
  });
});

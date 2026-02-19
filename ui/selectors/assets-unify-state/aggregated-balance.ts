/**
 * Selector for aggregated balance computed by the background when assets-unify-state is enabled.
 * The background includes aggregatedBalanceForSelectedAccount in getState() so the UI does not
 * need to import @metamask/assets-controller.
 */

export type AggregatedBalanceForAccount = {
  entries: Array<{ assetId: string; amount: string }>;
  totalBalanceInFiat?: number;
  pricePercentChange1d?: number;
};

type StateWithMetamask = {
  metamask?: {
    aggregatedBalanceForSelectedAccount?: AggregatedBalanceForAccount | null;
  };
};

/**
 * Returns the aggregated balance for the selected account when assets-unify-state is enabled.
 * Computed in the background and included in state; returns null when feature is off or not available.
 *
 * @param state - Redux state (root or metamask slice)
 * @returns Aggregated balance or null
 */
export function selectAggregatedBalanceForSelectedAccount(
  state: StateWithMetamask,
): AggregatedBalanceForAccount | null {
  return state.metamask?.aggregatedBalanceForSelectedAccount ?? null;
}

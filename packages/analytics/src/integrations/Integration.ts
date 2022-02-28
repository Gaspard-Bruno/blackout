/* eslint-disable no-unused-vars */

import type ConsentData from '../types/consentData.types';

export interface IntegrationFactory {
  new (
    options: Record<string, unknown>,
    loadData: Record<string, unknown>,
    strippedDownAnalytics: Record<string, unknown>,
  ): Integration;
  createInstance(
    options: Record<string, unknown>,
    loadData: Record<string, unknown>,
    analytics: Record<string, unknown>,
  ): Integration;
  shouldLoad(consent: Record<string, unknown>): boolean;
}

/**
 * Base class for integrations.
 * It ensures the base functionality in order to work with analytics.
 *
 * @category Analytics
 * @subcategory Integrations
 */

// @TODO: evaluate this TS rule
/* eslint-disable  @typescript-eslint/no-empty-function */
abstract class Integration {
  options: Record<string, unknown>;
  loadData: Record<string, unknown>;
  strippedDownAnalytics: Record<string, unknown>;

  /**
   * @hideconstructor
   *
   * @param {object} [options={}]          - Integration options.
   * @param {object} loadData              - Analytics's load event data.
   * @param {object} strippedDownAnalytics - Analytics instance stripped down with only helpers.
   */
  constructor(
    options: Record<string, unknown> = {},
    loadData: Record<string, unknown> = {},
    strippedDownAnalytics: Record<string, unknown> = {},
  ) {
    this.options = options;
    this.loadData = loadData;
    this.strippedDownAnalytics = strippedDownAnalytics;
  }

  /**
   * Method to check if the integration is ready to be loaded.
   *
   * @param {object} consent - The current consent given by the user.
   *
   * @returns {boolean} If the integration is ready to be loaded.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static shouldLoad(consent: Record<string, unknown>): boolean {
    return false;
  }

  /**
   * Method used to create a new instance of a Integration.
   *
   * @param {object} options   - Integration options.
   * @param {object} loadData  - Analytics's load event data.
   * @param {object} analytics - Analytics instance stripped down with only helpers.
   */
  static createInstance(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: Record<string, unknown>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadData: Record<string, unknown>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    analytics: Record<string, unknown>,
  ): void {}

  /**
   *
   * Tracks an event. This event can be a page view or a page action.
   *
   * @param {object} data - Event data.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  abstract track(data: Record<string, unknown>): void;

  /**
   * Method to work with the consent object by the class that extends this one.
   *
   * @param {object} consent - Consent object.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setConsent(consent: ConsentData): void {}

  /**
   * Method called after user has been set in analytics.
   *
   * @param {object} data - Event data.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetUser(data: Record<string, unknown>): void {}
}

export default Integration;

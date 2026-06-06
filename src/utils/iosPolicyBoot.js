import { isAppleMobileDevice } from './appleMobile.js';

/** sessionStorage key: next full-page boot should open this policy only. */
export const IOS_BOOT_POLICY_KEY = 'rl-sim2sim-ios-boot-policy';

export function shouldReloadForIosPolicySwitch(navigatorLike = globalThis.navigator) {
  return isAppleMobileDevice(navigatorLike);
}

export function scheduleIosPolicyBoot(policyValue) {
  try {
    sessionStorage.setItem(IOS_BOOT_POLICY_KEY, policyValue);
  } catch {
    /* private mode */
  }
  globalThis.location?.reload?.();
}

export function consumeIosBootPolicy() {
  try {
    const value = sessionStorage.getItem(IOS_BOOT_POLICY_KEY);
    if (value) {
      sessionStorage.removeItem(IOS_BOOT_POLICY_KEY);
    }
    return value;
  } catch {
    return null;
  }
}

export function peekIosBootPolicy() {
  try {
    return sessionStorage.getItem(IOS_BOOT_POLICY_KEY);
  } catch {
    return null;
  }
}

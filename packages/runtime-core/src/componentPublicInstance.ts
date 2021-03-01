import { hasOwn } from "@vue/shared/src";

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    // 取值时访问变量
    const { setupState, props, data } = instance;
    if (key[0] === '$') return;

    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    } else if(hasOwn(data, key)) {
      return data[key]
    } else {
      return undefined;
    }
  },
  set({ _: instance }, key, value) {
    const { setupState, props, data } = instance;
    if (hasOwn(setupState, key)) {
      setupState[key] = value;
    } else if (hasOwn(props, key)) {
      props[key] = value;
    } else if(hasOwn(data, key)) {
      data[key] = value
    }
    return true;
  }
}
/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/(auth)/welcome` | `/(root)` | `/(root)/(tabs)` | `/(root)/(tabs)/chat` | `/(root)/(tabs)/courses` | `/(root)/(tabs)/home` | `/(root)/(tabs)/profile` | `/(root)/chat` | `/(root)/courses` | `/(root)/home` | `/(root)/profile` | `/(tabs)` | `/(tabs)/chat` | `/(tabs)/courses` | `/(tabs)/home` | `/(tabs)/profile` | `/_sitemap` | `/chat` | `/courses` | `/home` | `/profile` | `/sign-in` | `/sign-up` | `/welcome`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}

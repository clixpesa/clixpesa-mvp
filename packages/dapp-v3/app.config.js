export default{
  expo: {
    name: "dapp-v3",
    slug: "dapp-v3",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    plugins: [
    "expo-secure-store"
  ],
    ios: {
      "supportsTablet": true
    },
    android: {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    web: {
      "favicon": "./assets/favicon.png"
    }
  }
}

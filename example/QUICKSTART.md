# 🚀 Quick Start with Expo

## Install Dependencies

```bash
cd example
npm install
```

## Run the App

```bash
npm start
```

This will open Expo DevTools in your browser. From there you can:

- **Scan QR code** with Expo Go app on your phone
- Press **`i`** to open iOS Simulator
- Press **`a`** to open Android Emulator
- Press **`w`** to open in web browser

## First Time Setup

### iOS (Mac only)

```bash
# Install Xcode from App Store
# Then install Expo Go from App Store on your iPhone
```

### Android

```bash
# Install Android Studio
# Setup an emulator
# Or install Expo Go from Play Store on your Android phone
```

### Web

No additional setup needed! Just press `w` after `npm start`.

## Troubleshooting

### "Cannot find module @purjayadi/react-native-datepicker"

```bash
# From the root directory (not example folder)
cd ..
npm install
npm run build

# Back to example
cd example
rm -rf node_modules
npm install
```

### Expo not working

```bash
# Clear cache and restart
rm -rf .expo node_modules
npm install
npm start -- --clear
```

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Go App](https://expo.dev/client)
- [React Native Documentation](https://reactnative.dev/)

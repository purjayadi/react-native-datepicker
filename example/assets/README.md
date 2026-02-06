# Assets Folder

This folder should contain the following Expo assets:

## Required Files

1. **icon.png** (1024x1024)
   - App icon for both iOS and Android
2. **adaptive-icon.png** (1024x1024)
   - Android adaptive icon foreground

3. **splash.png** (1284x2778)
   - Splash screen image

4. **favicon.png** (48x48)
   - Web favicon

## Creating Assets

You can generate these assets using:

### Option 1: Use Expo's default assets

Just run `expo start` and Expo will use default placeholder assets.

### Option 2: Create custom assets

1. Design your icons/splash screen
2. Export as PNG files with the dimensions above
3. Place them in this folder
4. Run `expo start` to see your custom assets

### Option 3: Use online tools

- [App Icon Generator](https://www.appicon.co/)
- [Expo Asset Generator](https://github.com/expo/expo-cli)

## Note

The app will work fine without custom assets. Expo will use default placeholders during development.

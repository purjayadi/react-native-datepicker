# Environment Setup for Expo Example

## Node Modules Resolution

This example app uses `file:..` to link to the parent package for development. This is configured in `package.json`:

```json
{
  "dependencies": {
    "@purjayadi/react-native-datepicker": "file:.."
  }
}
```

## Development Workflow

### 1. Make changes to the main package

```bash
# In the root directory
cd /path/to/react-native-datepicker
# Make your changes to src/DatePicker.tsx
npm run build
```

### 2. Test in example app

```bash
cd example
rm -rf node_modules
npm install
npm start
```

## Expo Configuration

The example app is configured with:

- **Expo SDK ~50.0.0**
- React Native 0.73.4
- TypeScript support
- Reanimated gesture handler
- Bottom sheet modal

## Platform Support

- ✅ iOS (Simulator or physical device via Expo Go)
- ✅ Android (Emulator or physical device via Expo Go)
- ✅ Web (Browser)

## Notes

- Assets (icon, splash) are optional for development
- Expo Go app required for testing on physical devices
- Hot reload is enabled by default
- Metro bundler runs on port 8081 by default

## Useful Expo Commands

```bash
# Start with clean cache
npm start -- --clear

# Reset project cache
expo start -c

# Check for issues
expo doctor

# Update Expo SDK
expo upgrade
```

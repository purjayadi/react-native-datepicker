# Publishing Guide

This guide explains how to publish your package to npm.

## Prerequisites

1. Create an npm account at [npmjs.com](https://www.npmjs.com/signup)
2. Verify your email address
3. Enable 2FA (Two-Factor Authentication) for extra security

## First Time Setup

### 1. Enable 2FA (Two-Factor Authentication)

**REQUIRED:** npm requires 2FA to publish packages.

1. Go to [npmjs.com](https://www.npmjs.com/) and login
2. Click your profile → **Account**
3. Go to **Two-Factor Authentication**
4. Click **Enable 2FA**
5. Choose **Authorization and Publishing** (recommended)
6. Follow the setup wizard (use authenticator app like Google Authenticator)

### 2. Login to npm

```bash
npm login
```

You'll be prompted for:

- Username
- Password
- Email
- **2FA code** (from your authenticator app)

### 3. Verify Login

```bash
npm whoami
# Should display: purjayadi
```

### 4. Build your package

```bash
npm run build
```

## Before Publishing

### Checklist

- [ ] Update version in package.json (follow [Semantic Versioning](https://semver.org/))
- [ ] Update CHANGELOG.md with new changes
- [ ] Test the package locally
- [ ] Run build command: `npm run build`
- [ ] Check that `dist/` folder is created
- [ ] Review files that will be published: `npm pack --dry-run`

### Testing Locally

Test your package in another project before publishing:

```bash
# In your package directory
npm pack

# This creates a .tgz file, install it in another project:
cd /path/to/test-project
npm install /path/to/react-native-datepicker/react-native-datepicker-1.0.0.tgz
```

## Publishing

### First Publication

```bash
npm publish
```

If your package name is scoped (e.g., `@yourname/react-native-datepicker`), use:

```bash
npm publish --access public
```

### Subsequent Updates

1. Update version in package.json:

```bash
# For bug fixes
npm version patch  # 1.0.0 -> 1.0.1

# For new features
npm version minor  # 1.0.0 -> 1.1.0

# For breaking changes
npm version major  # 1.0.0 -> 2.0.0
```

2. Build and publish:

```bash
npm run build
npm publish --access public
```

(You'll need your 2FA code for each publish)

## After Publishing

1. Verify your package on npmjs.com
2. Test installation in a fresh project:

```bash
npm install @purjayadi/react-native-datepicker
```

3. Create a git tag for the version:

```bash
git tag v1.0.0
git push origin v1.0.0
```

4. Create a GitHub release with changelog

## Troubleshooting

### E403: Two-factor authentication required

**Error:** `403 Forbidden - Two-factor authentication is required to publish packages`

**Solution:**

1. Enable 2FA on your npm account:
   - Go to npmjs.com → Profile → Account → Two-Factor Authentication
   - Enable 2FA for "Authorization and Publishing"
2. Logout and login again:
   ```bash
   npm logout
   npm login
   ```
3. Try publishing again:
   ```bash
   npm publish --access public
   ```

### E403: Permission denied / Forbidden

**Solution:**

1. Check you're logged in:
   ```bash
   npm whoami
   # Should show: purjayadi
   ```
2. If not logged in:
   ```bash
   npm login
   ```
3. Verify you own the package scope:
   - Your username must match the scope (@purjayadi)
   - Check on npmjs.com/settings/[username]/packages

### Package name already taken

- This package already uses a scoped name: `@purjayadi/react-native-datepicker`
- Scoped packages under your username are always available

### Not logged in

```bash
npm logout
npm login
# Enter your credentials and 2FA code
```

### Build errors

- Clear dist folder: `rm -rf dist`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Run build again: `npm run build`

## Useful Commands

```bash
# Check if you're logged in
npm whoami

# View package info
npm view @purjayadi/react-native-datepicker

# Check what files will be published
npm pack --dry-run

# Test package installation
npm install @purjayadi/react-native-datepicker --dry-run

# Unpublish (within 72 hours)
npm unpublish @purjayadi/react-native-datepicker@1.0.0

# Deprecate a version
npm deprecate @purjayadi/react-native-datepicker@1.0.0 "Use version 1.0.1 instead"
```

## Best Practices

1. **Always test before publishing**
2. **Use semantic versioning correctly**
3. **Keep CHANGELOG.md updated**
4. **Never publish with uncommitted changes**
5. **Add git tags for releases**
6. **Update README.md with accurate information**
7. **Test on both iOS and Android before major releases**

## Support

- npm Documentation: https://docs.npmjs.com/
- Semantic Versioning: https://semver.org/
- Package.json Guide: https://docs.npmjs.com/cli/v8/configuring-npm/package-json

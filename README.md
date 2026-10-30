# Wipple

Wipple is a Windows desktop companion built with Tauri 2, React, TypeScript, and Rust.

## Development

```powershell
npm install
npm run dev          # Browser preview at http://localhost:1420
npm run test         # Persistence tests
npm run build        # TypeScript + Vite production build
npm run tauri:dev    # Desktop shell (requires Rust + Windows tooling)
npm run tauri:build  # Windows installer/bundle
```

## Current scope

- The main Tauri window provides Dashboard, Settings, and module navigation.
- Settings are persisted locally under `wipple.settings.v1`.
- Dynamic Notch is a real, borderless, always-on-top Tauri webview window created by Rust. It is centered on the current monitor, accounts for monitor scale factor, and changes size/position on hover or click.
- AirPods, Screen Mirroring, and System are intentionally marked **Coming soon**. They do not display simulated device data.
- GSMTC/media controls, AirPods discovery, wireless display APIs, and launch-at-startup registration are interfaces reserved for a later native implementation. No fake media integration is presented.

## Windows tooling note

The repository can be linted and browser-built with Node.js alone. `tauri:dev` and `tauri:build` require the Rust toolchain and Windows prerequisites (MSVC build tools and WebView2). The setup machine initially had no Rust tools; the official Rustup package was installed with `winget`, providing the stable MSVC toolchain (`rustc 1.99.1`, `cargo 1.99.1`). Native Windows bundling now succeeds and produces MSI and NSIS installers. A fresh terminal may be needed to pick up `%USERPROFILE%\.cargo\bin` on `PATH`.

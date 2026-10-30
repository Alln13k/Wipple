#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    AppHandle, Manager, PhysicalPosition, PhysicalSize, Position, Size, WebviewUrl,
    WebviewWindowBuilder,
};

const NOTCH_WIDTH: f64 = 420.0;
const NOTCH_COLLAPSED_HEIGHT: f64 = 56.0;
const NOTCH_EXPANDED_HEIGHT: f64 = 188.0;

#[tauri::command]
fn set_notch_expanded(app: AppHandle, expanded: bool) -> Result<(), String> {
    let notch = app
        .get_webview_window("notch")
        .ok_or_else(|| "Dynamic Notch window is not available".to_owned())?;
    let monitor = notch
        .current_monitor()
        .map_err(|error| error.to_string())?
        .ok_or_else(|| "No display is available for the Dynamic Notch".to_owned())?;
    let scale = monitor.scale_factor();
    let width = (NOTCH_WIDTH * scale).round() as u32;
    let height = ((if expanded {
        NOTCH_EXPANDED_HEIGHT
    } else {
        NOTCH_COLLAPSED_HEIGHT
    }) * scale)
        .round() as u32;
    let monitor_position = monitor.position();
    let monitor_size = monitor.size();
    let x = monitor_position.x + ((monitor_size.width as i32 - width as i32) / 2);
    let y = monitor_position.y + (12.0 * scale).round() as i32;

    notch
        .set_size(Size::Physical(PhysicalSize::new(width, height)))
        .map_err(|error| error.to_string())?;
    notch
        .set_position(Position::Physical(PhysicalPosition::new(x, y)))
        .map_err(|error| error.to_string())?;
    Ok(())
}

#[tauri::command]
fn set_notch_enabled(app: AppHandle, enabled: bool) -> Result<(), String> {
    let notch = app
        .get_webview_window("notch")
        .ok_or_else(|| "Dynamic Notch window is not available".to_owned())?;
    if enabled {
        notch.show().map_err(|error| error.to_string())
    } else {
        notch.hide().map_err(|error| error.to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_notch_expanded, set_notch_enabled])
        .setup(|app| {
            let main_window = app
                .get_webview_window("main")
                .ok_or("Main Wipple window was not created")?;
            let monitor = main_window
                .current_monitor()?
                .ok_or("No display is available for the Dynamic Notch")?;
            let scale = monitor.scale_factor();
            let width = (NOTCH_WIDTH * scale).round() as u32;
            let height = (NOTCH_COLLAPSED_HEIGHT * scale).round() as u32;
            let monitor_position = monitor.position();
            let monitor_size = monitor.size();
            let x = monitor_position.x + ((monitor_size.width as i32 - width as i32) / 2);
            let y = monitor_position.y + (12.0 * scale).round() as i32;

            WebviewWindowBuilder::new(
                app,
                "notch",
                WebviewUrl::App("index.html#/notch".into()),
            )
            .title("Wipple Dynamic Notch")
            .inner_size(width as f64, height as f64)
            .position(x as f64, y as f64)
            .decorations(false)
            .transparent(true)
            .always_on_top(true)
            .resizable(false)
            .skip_taskbar(true)
            .focused(false)
            .visible(true)
            .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Wipple");
}

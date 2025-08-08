# Tauri 开发教程：从入门到大师

## 目录

- [入门篇](#入门篇)
  - [Tauri 简介](#tauri-简介)
  - [环境配置](#环境配置)
  - [创建第一个 Tauri 应用](#创建第一个-tauri-应用)
  - [项目结构](#项目结构)
- [基础篇](#基础篇)
  - [前端框架集成](#前端框架集成)
  - [Tauri API](#tauri-api)
  - [窗口管理](#窗口管理)
  - [菜单和托盘](#菜单和托盘)
  - [对话框](#对话框)
- [高阶篇](#高阶篇)
  - [Rust 后端开发](#rust-后端开发)
  - [命令系统](#命令系统)
  - [状态管理](#状态管理)
  - [文件系统访问](#文件系统访问)
  - [网络请求](#网络请求)
- [大师篇](#大师篇)
  - [插件开发](#插件开发)
  - [安全性考量](#安全性考量)
  - [性能优化](#性能优化)
  - [自动更新](#自动更新)
  - [多平台构建与发布](#多平台构建与发布)

## 入门篇

### Tauri 简介

Tauri 是一个用于构建跨平台桌面应用的框架，它使用 Web 技术作为 UI 层，Rust 作为后端语言。Tauri 的主要特点包括：

- **轻量级**：Tauri 应用比 Electron 应用小得多，因为它使用系统的 WebView 而不是捆绑 Chromium
- **安全性**：默认采用安全优先的设计理念
- **性能**：Rust 后端提供高性能的原生功能
- **跨平台**：支持 Windows、macOS 和 Linux
- **自定义性**：高度可配置，可以根据需要启用或禁用功能

Tauri 适合开发需要原生性能和较小安装包的桌面应用，如工具类应用、生产力软件和游戏等。

### 环境配置

在开始使用 Tauri 之前，需要安装以下依赖：

#### 1. Rust 工具链

```bash
# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
# 或在 Windows 上下载并运行 rustup-init.exe

# 验证安装
rustc --version
cargo --version
```

#### 2. 系统依赖

**Windows**:
- 安装 [Visual Studio C++ 构建工具](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- 安装 [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

**macOS**:
```bash
xcode-select --install
```

**Linux (Debian/Ubuntu)**:
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

#### 3. Node.js 和前端工具

```bash
# 安装 Node.js (推荐使用 nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install --lts

# 验证安装
node --version
npm --version
```

#### 4. Tauri CLI

```bash
# 安装 Tauri CLI
cargo install tauri-cli
```

### 创建第一个 Tauri 应用

#### 使用 Tauri CLI 创建项目

```bash
# 创建新项目
cargo create-tauri-app

# 按照提示选择前端框架和项目名称
# 例如选择 React 和项目名称 "my-tauri-app"
```

或者，你可以使用特定模板直接创建：

```bash
# 使用 Vite + React 模板
cargo create-tauri-app --template vite-react my-tauri-app
```

#### 运行开发服务器

```bash
cd my-tauri-app
cargo tauri dev
```

这将启动前端开发服务器和 Tauri 应用程序。

#### 构建发布版本

```bash
cargo tauri build
```

构建完成后，可执行文件将位于 `src-tauri/target/release` 目录中。

### 项目结构

一个典型的 Tauri 项目结构如下：

```
my-tauri-app/
├── src/                  # 前端源代码
│   ├── assets/           # 静态资源
│   ├── components/       # React/Vue 组件
│   ├── App.jsx           # 主应用组件
│   └── main.jsx          # 入口文件
├── src-tauri/            # Tauri/Rust 后端代码
│   ├── src/              # Rust 源代码
│   │   └── main.rs       # Rust 入口文件
│   ├── Cargo.toml        # Rust 依赖配置
│   ├── tauri.conf.json   # Tauri 配置文件
│   └── icons/            # 应用图标
├── package.json          # 前端依赖配置
├── vite.config.js        # Vite 配置（如果使用 Vite）
└── README.md             # 项目说明
```

#### 关键文件说明

- **src-tauri/tauri.conf.json**：Tauri 应用的主要配置文件，包含窗口设置、安全策略等
- **src-tauri/src/main.rs**：Rust 后端的入口点，定义命令和初始化 Tauri 应用
- **src/main.jsx**：前端应用的入口点
- **package.json**：前端依赖和脚本配置

## 基础篇

### 前端框架集成

Tauri 可以与任何前端框架一起使用，包括 React、Vue、Svelte、Angular 等。

#### React 集成

```jsx
// src/App.jsx
import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';

function App() {
  const [greeting, setGreeting] = useState('');

  async function greet() {
    // 调用在 Rust 中定义的命令
    setGreeting(await invoke('greet', { name: 'React' }));
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <button onClick={greet}>Greet</button>
      <p>{greeting}</p>
    </div>
  );
}

export default App;
```

#### Vue 集成

```vue
<!-- src/App.vue -->
<script setup>
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/tauri';

const greeting = ref('');

async function greet() {
  greeting.value = await invoke('greet', { name: 'Vue' });
}
</script>

<template>
  <div class="container">
    <h1>Welcome to Tauri!</h1>
    <button @click="greet">Greet</button>
    <p>{{ greeting }}</p>
  </div>
</template>
```

#### Svelte 集成

```svelte
<!-- src/App.svelte -->
<script>
  import { invoke } from '@tauri-apps/api/tauri';
  
  let greeting = '';
  
  async function greet() {
    greeting = await invoke('greet', { name: 'Svelte' });
  }
</script>

<div class="container">
  <h1>Welcome to Tauri!</h1>
  <button on:click={greet}>Greet</button>
  <p>{greeting}</p>
</div>
```

### Tauri API

Tauri 提供了一组 JavaScript API，用于与 Rust 后端和操作系统交互。

#### 安装 Tauri API

```bash
npm install @tauri-apps/api
```

#### 基本用法

```javascript
// 导入所需的 API
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import { appWindow } from '@tauri-apps/api/window';

// 调用 Rust 命令
async function callRustFunction() {
  const result = await invoke('my_command', { arg1: 'value1', arg2: 42 });
  console.log(result);
}

// 打开文件对话框
async function openFile() {
  const selected = await open({
    multiple: false,
    filters: [{
      name: 'Images',
      extensions: ['png', 'jpg']
    }]
  });
  
  if (selected) {
    console.log(`Selected file: ${selected}`);
  }
}

// 控制窗口
function minimizeWindow() {
  appWindow.minimize();
}
```

### 窗口管理

Tauri 允许你创建和管理多个窗口。

#### 配置主窗口

在 `tauri.conf.json` 中配置主窗口：

```json
{
  "tauri": {
    "windows": [
      {
        "title": "My Tauri App",
        "width": 800,
        "height": 600,
        "resizable": true,
        "fullscreen": false,
        "decorations": true
      }
    ]
  }
}
```

#### 在 JavaScript 中控制窗口

```javascript
import { appWindow } from '@tauri-apps/api/window';

// 最小化窗口
appWindow.minimize();

// 最大化窗口
appWindow.maximize();

// 关闭窗口
appWindow.close();

// 监听窗口事件
appWindow.listen('tauri://move', ({ event, payload }) => {
  console.log(`Window moved to: ${payload.x}, ${payload.y}`);
});
```

#### 在 Rust 中创建新窗口

```rust
// src-tauri/src/main.rs
#[tauri::command]
fn open_new_window(handle: tauri::AppHandle) {
    tauri::WindowBuilder::new(
        &handle,
        "new-window", // 唯一标识符
        tauri::WindowUrl::App("new-window.html".into())
    )
    .title("New Window")
    .inner_size(400.0, 300.0)
    .build()
    .unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_new_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### 菜单和托盘

#### 配置应用菜单

在 Rust 中定义应用菜单：

```rust
// src-tauri/src/main.rs
use tauri::{Menu, MenuItem, Submenu};

fn main() {
    let file_menu = Submenu::new("文件", Menu::new()
        .add_item(MenuItem::new("新建", "new"))
        .add_item(MenuItem::new("打开", "open"))
        .add_native_item(MenuItem::Separator)
        .add_item(MenuItem::new("退出", "quit")));

    let edit_menu = Submenu::new("编辑", Menu::new()
        .add_item(MenuItem::new("剪切", "cut"))
        .add_item(MenuItem::new("复制", "copy"))
        .add_item(MenuItem::new("粘贴", "paste")));

    let menu = Menu::new()
        .add_submenu(file_menu)
        .add_submenu(edit_menu);

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| {
            match event.menu_item_id() {
                "quit" => {
                    std::process::exit(0);
                }
                "new" => {
                    // 处理新建操作
                }
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### 系统托盘

```rust
// src-tauri/src/main.rs
use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayEvent};

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let hide = CustomMenuItem::new("hide".to_string(), "隐藏");
    let show = CustomMenuItem::new("show".to_string(), "显示");
    
    let tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    
    let system_tray = SystemTray::new()
        .with_menu(tray_menu);

    tauri::Builder::default()
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
                match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    "hide" => {
                        let window = app.get_window("main").unwrap();
                        window.hide().unwrap();
                    }
                    "show" => {
                        let window = app.get_window("main").unwrap();
                        window.show().unwrap();
                    }
                    _ => {}
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### 对话框

#### 在 JavaScript 中使用对话框

```javascript
import { open, save, message, confirm } from '@tauri-apps/api/dialog';

// 打开文件对话框
async function openFileDialog() {
  const selected = await open({
    multiple: true,
    filters: [{
      name: 'Images',
      extensions: ['png', 'jpg', 'jpeg']
    }]
  });
  console.log(selected);
}

// 保存文件对话框
async function saveFileDialog() {
  const filePath = await save({
    filters: [{
      name: 'Text',
      extensions: ['txt']
    }]
  });
  console.log(filePath);
}

// 消息对话框
async function showMessage() {
  await message('这是一条信息', { title: '提示', type: 'info' });
}

// 确认对话框
async function askConfirmation() {
  const confirmed = await confirm('确定要删除吗？', { title: '确认', type: 'warning' });
  if (confirmed) {
    console.log('用户确认了操作');
  } else {
    console.log('用户取消了操作');
  }
}
```

#### 在 Rust 中显示对话框

```rust
// src-tauri/src/main.rs
#[tauri::command]
async fn show_dialog(window: tauri::Window) -> Result<(), String> {
    tauri::api::dialog::MessageDialogBuilder::new("标题", "这是一条消息")
        .kind(tauri::api::dialog::MessageDialogKind::Info)
        .buttons(tauri::api::dialog::MessageDialogButtons::Ok)
        .show(move |_| {});
    
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![show_dialog])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

## 高阶篇

### Rust 后端开发

Tauri 的一个主要优势是可以使用 Rust 编写高性能的后端逻辑。

#### 基本结构

```rust
// src-tauri/src/main.rs
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// 导入模块
mod commands;
mod utils;

use commands::{greet, get_data, save_data};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            get_data,
            save_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### 创建命令模块

```rust
// src-tauri/src/commands.rs
use serde::{Deserialize, Serialize};
use std::fs;

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    name: String,
    age: u32,
}

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn get_data() -> Result<Vec<User>, String> {
    let data = fs::read_to_string("data.json")
        .map_err(|e| e.to_string())?;
    
    let users: Vec<User> = serde_json::from_str(&data)
        .map_err(|e| e.to_string())?;
    
    Ok(users)
}

#[tauri::command]
pub fn save_data(users: Vec<User>) -> Result<(), String> {
    let json = serde_json::to_string_pretty(&users)
        .map_err(|e| e.to_string())?;
    
    fs::write("data.json", json)
        .map_err(|e| e.to_string())?;
    
    Ok(())
}
```

#### 添加依赖

在 `src-tauri/Cargo.toml` 中添加依赖：

```toml
[dependencies]
tauri = { version = "1.2", features = ["dialog-all", "fs-all", "shell-open"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

### 命令系统

Tauri 的命令系统允许前端 JavaScript 代码调用 Rust 函数。

#### 定义命令

```rust
// 基本命令
#[tauri::command]
fn simple_command() -> String {
    "Hello from Rust!".into()
}

// 带参数的命令
#[tauri::command]
fn with_args(name: String, age: u32) -> String {
    format!("Hello, {}! You are {} years old.", name, age)
}

// 异步命令
#[tauri::command]
async fn async_command() -> Result<String, String> {
    // 模拟异步操作
    tokio::time::sleep(std::time::Duration::from_secs(1)).await;
    Ok("Async operation completed!".into())
}

// 访问窗口状态
#[tauri::command]
fn window_command(window: tauri::Window) {
    window.set_title("New Title").unwrap();
}

// 访问应用状态
#[tauri::command]
fn state_command(state: tauri::State<AppState>) -> String {
    format!("Counter: {}", state.counter.lock().unwrap())
}
```

#### 注册命令

```rust
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            simple_command,
            with_args,
            async_command,
            window_command,
            state_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### 从 JavaScript 调用命令

```javascript
import { invoke } from '@tauri-apps/api/tauri';

// 调用简单命令
async function callSimpleCommand() {
  const response = await invoke('simple_command');
  console.log(response); // "Hello from Rust!"
}

// 调用带参数的命令
async function callWithArgs() {
  const response = await invoke('with_args', {
    name: 'Alice',
    age: 30
  });
  console.log(response); // "Hello, Alice! You are 30 years old."
}

// 调用异步命令
async function callAsyncCommand() {
  try {
    const response = await invoke('async_command');
    console.log(response); // "Async operation completed!"
  } catch (error) {
    console.error(error);
  }
}
```

### 状态管理

Tauri 允许你在 Rust 后端管理应用状态。

#### 定义应用状态

```rust
// src-tauri/src/main.rs
use std::sync::{Arc, Mutex};
use tauri::State;

// 定义应用状态结构
struct AppState {
    counter: Arc<Mutex<i32>>,
    config: Arc<Mutex<Config>>,
}

#[derive(serde::Serialize, serde::Deserialize, Clone)]
struct Config {
    theme: String,
    language: String,
}

// 访问和修改状态的命令
#[tauri::command]
fn get_counter(state: State<AppState>) -> i32 {
    *state.counter.lock().unwrap()
}

#[tauri::command]
fn increment_counter(state: State<AppState>) -> i32 {
    let mut counter = state.counter.lock().unwrap();
    *counter += 1;
    *counter
}

#[tauri::command]
fn get_config(state: State<AppState>) -> Config {
    state.config.lock().unwrap().clone()
}

#[tauri::command]
fn update_config(state: State<AppState>, new_config: Config) {
    let mut config = state.config.lock().unwrap();
    *config = new_config;
}

fn main() {
    // 初始化应用状态
    let app_state = AppState {
        counter: Arc::new(Mutex::new(0)),
        config: Arc::new(Mutex::new(Config {
            theme: "light".into(),
            language: "en".into(),
        })),
    };

    tauri::Builder::default()
        .manage(app_state) // 注册应用状态
        .invoke_handler(tauri::generate_handler![
            get_counter,
            increment_counter,
            get_config,
            update_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### 文件系统访问

Tauri 提供了安全的文件系统访问 API。

#### 在 JavaScript 中访问文件系统

```javascript
import { readTextFile, writeTextFile, readBinaryFile, writeBinaryFile } from '@tauri-apps/api/fs';
import { documentDir, downloadDir } from '@tauri-apps/api/path';

// 读取文本文件
async function readFile() {
  try {
    const docDir = await documentDir();
    const contents = await readTextFile(`${docDir}/example.txt`);
    console.log(contents);
  } catch (error) {
    console.error(error);
  }
}

// 写入文本文件
async function writeFile() {
  try {
    const docDir = await documentDir();
    await writeTextFile(`${docDir}/example.txt`, 'Hello, Tauri!');
    console.log('File written successfully');
  } catch (error) {
    console.error(error);
  }
}

// 读取二进制文件
async function readImage() {
  try {
    const downloadDir = await downloadDir();
    const data = await readBinaryFile(`${downloadDir}/image.png`);
    // 处理二进制数据
    console.log(`Read ${data.length} bytes`);
  } catch (error) {
    console.error(error);
  }
}
```

#### 在 Rust 中访问文件系统

```rust
use std::fs;
use tauri::api::path;

#[tauri::command]
async fn read_config_file() -> Result<String, String> {
    let config_dir = path::config_dir().ok_or("Failed to get config directory")?;
    let config_path = config_dir.join("myapp").join("config.json");
    
    fs::read_to_string(config_path).map_err(|e| e.to_string())
}

#[tauri::command]
async fn write_log(content: String) -> Result<(), String> {
    let log_dir = path::app_log_dir(&tauri::Config::default())
        .map_err(|e| e.to_string())?;
    
    // 确保目录存在
    fs::create_dir_all(&log_dir).map_err(|e| e.to_string())?;
    
    let log_path = log_dir.join("app.log");
    fs::write(log_path, content).map_err(|e| e.to_string())
}
```

### 网络请求

#### 在 JavaScript 中发起网络请求

```javascript
import { fetch } from '@tauri-apps/api/http';

// GET 请求
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// POST 请求
async function postData() {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
      })
    });
    
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

#### 在 Rust 中发起网络请求

```rust
// 在 src-tauri/Cargo.toml 中添加依赖
// reqwest = { version = "0.11", features = ["json"] }
// tokio = { version = "1", features = ["full"] }
// serde = { version = "1.0", features = ["derive"] }
// serde_json = "1.0"

use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct User {
    name: String,
    email: String,
}

#[derive(Serialize, Deserialize)]
struct ApiResponse {
    success: bool,
    data: Option<Vec<User>>,
    message: Option<String>,
}

#[tauri::command]
async fn fetch_users() -> Result<Vec<User>, String> {
    let client = Client::new();
    let response = client.get("https://api.example.com/users")
        .send()
        .await
        .map_err(|e| e.to_string())?;
    
    let api_response: ApiResponse = response.json()
        .await
        .map_err(|e| e.to_string())?;
    
    if api_response.success {
        api_response.data.ok_or("No data returned".to_string())
    } else {
        Err(api_response.message.unwrap_or("Unknown error".to_string()))
    }
}

#[tauri::command]
async fn create_user(user: User) -> Result<User, String> {
    let client = Client::new();
    let response = client.post("https://api.example.com/users")
        .json(&user)
        .send()
        .await
        .map_err(|e| e.to_string())?;
    
    let created_user: User = response.json()
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(created_user)
}
```

## 大师篇

### 插件开发

Tauri 允许你创建插件来扩展其功能。

#### 创建插件项目

```bash
# 创建插件项目
cargo new --lib tauri-plugin-myfeature
cd tauri-plugin-myfeature
```

#### 插件结构

```rust
// src/lib.rs
use tauri::{
    plugin::{Builder, TauriPlugin},
    Runtime, Window,
};

// 插件状态
pub struct MyFeatureState {
    // 插件需要的状态
}

// 插件命令
#[tauri::command]
fn my_plugin_command(state: tauri::State<MyFeatureState>) -> String {
    "Plugin command executed!".into()
}

// 创建插件
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("myfeature")
        .invoke_handler(tauri::generate_handler![my_plugin_command])
        .setup(|app| {
            // 初始化插件
            app.manage(MyFeatureState {
                // 初始化状态
            });
            Ok(())
        })
        .build()
}
```

#### 在 Cargo.toml 中配置插件

```toml
[package]
name = "tauri-plugin-myfeature"
version = "0.1.0"
edition = "2021"

[dependencies]
tauri = { version = "1.2" }
serde = { version = "1.0", features = ["derive"] }
```

#### 使用插件

在主应用的 `src-tauri/Cargo.toml` 中添加插件依赖：

```toml
[dependencies]
tauri = { version = "1.2" }
tauri-plugin-myfeature = { path = "../tauri-plugin-myfeature" }
```

在主应用的 `src-tauri/src/main.rs` 中注册插件：

```rust
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_myfeature::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### 安全性考量

Tauri 默认采用安全优先的设计理念，但在开发过程中仍需注意一些安全问题。

#### 配置安全策略

在 `tauri.conf.json` 中配置安全策略：

```json
{
  "tauri": {
    "security": {
      "csp": "default-src 'self'; img-src 'self' https://example.com; script-src 'self'",
      "dangerousRemoteDomainIpcAccess": [
        {
          "domain": "api.example.com",
          "windows": ["main"],
          "plugins": ["fs"]
        }
      ]
    }
  }
}
```

#### 限制命令访问

```rust
// 限制命令只能从特定域名调用
#[tauri::command]
#[specta::specta]
#[command_with_permissions("allow-read-file", "https://example.com")]
fn read_sensitive_file() -> Result<String, String> {
    // 实现...
}
```

#### 安全地处理用户输入

```rust
// 验证和清理用户输入
#[tauri::command]
fn process_user_input(input: String) -> Result<String, String> {
    // 验证输入
    if input.len() > 1000 {
        return Err("Input too long".into());
    }
    
    // 清理输入（例如，移除危险字符）
    let cleaned_input = input
        .chars()
        .filter(|c| c.is_alphanumeric() || c.is_whitespace())
        .collect::<String>();
    
    // 处理清理后的输入
    Ok(format!("Processed: {}", cleaned_input))
}
```

#### 安全地执行系统命令

```rust
use std::process::Command;

#[tauri::command]
fn execute_safe_command(args: Vec<String>) -> Result<String, String> {
    // 验证命令和参数
    if args.is_empty() {
        return Err("No command provided".into());
    }
    
    // 白名单检查
    let allowed_commands = vec!["ls", "dir", "echo"];
    if !allowed_commands.contains(&args[0].as_str()) {
        return Err("Command not allowed".into());
    }
    
    // 执行命令
    let output = Command::new(&args[0])
        .args(&args[1..])
        .output()
        .map_err(|e| e.to_string())?;
    
    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}
```

### 性能优化

#### 减小应用体积

在 `tauri.conf.json` 中配置：

```json
{
  "tauri": {
    "bundle": {
      "active": true,
      "icon": ["icons/32x32.png", "icons/128x128.png", "icons/128x128@2x.png"],
      "identifier": "com.example.myapp",
      "targets": ["deb", "msi", "dmg"],
      "resources": [],
      "externalBin": [],
      "category": "DeveloperTool"
    }
  }
}
```

#### 优化 Rust 代码

```rust
// 在 src-tauri/Cargo.toml 中配置发布优化
[profile.release]
panic = "abort"     // 在 panic 时直接终止程序
codegen-units = 1   // 减少并行代码生成单元，提高优化
lto = true          // 启用链接时优化
opt-level = "s"     // 优化体积 ("s" 或 "z" 用于体积，"3" 用于速度)
strip = true        // 去除符号信息
```

#### 优化前端代码

```javascript
// 使用代码分割
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
```

#### 使用 Web Workers 处理密集型计算

```javascript
// worker.js
self.onmessage = function(e) {
  const result = heavyCalculation(e.data);
  self.postMessage(result);
};

function heavyCalculation(data) {
  // 执行密集型计算
  return processedData;
}

// main.js
const worker = new Worker('worker.js');

worker.onmessage = function(e) {
  console.log('计算结果:', e.data);
};

worker.postMessage(inputData);
```

### 自动更新

Tauri 提供了内置的自动更新功能。

#### 配置自动更新

在 `tauri.conf.json` 中配置：

```json
{
  "tauri": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{current_version}}"
      ],
      "dialog": true,
      "pubkey": "YOUR_PUBLIC_KEY_HERE"
    }
  }
}
```

#### 生成更新密钥对

```bash
# 安装 tauri-cli
cargo install tauri-cli

# 生成密钥对
cargo tauri signer generate -w ~/.tauri/myapp.key
```

#### 创建更新服务器

更新服务器需要提供一个 JSON 响应，格式如下：

```json
{
  "version": "v1.0.1",
  "notes": "新版本修复了一些 bug 并添加了新功能",
  "pub_date": "2023-01-15T12:00:00Z",
  "platforms": {
    "darwin-x86_64": {
      "signature": "BASE64_SIGNATURE_HERE",
      "url": "https://releases.myapp.com/darwin-x86_64/MyApp_1.0.1_x64.app.tar.gz"
    },
    "windows-x86_64": {
      "signature": "BASE64_SIGNATURE_HERE",
      "url": "https://releases.myapp.com/windows-x86_64/MyApp_1.0.1_x64-setup.exe"
    },
    "linux-x86_64": {
      "signature": "BASE64_SIGNATURE_HERE",
      "url": "https://releases.myapp.com/linux-x86_64/myapp_1.0.1_amd64.deb"
    }
  }
}
```

#### 在前端检查更新

```javascript
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';

async function checkForUpdates() {
  try {
    const { shouldUpdate, manifest } = await checkUpdate();
    
    if (shouldUpdate) {
      console.log(`更新可用: ${manifest.version} (当前版本: ${manifest.currentVersion})`);
      console.log(`更新说明: ${manifest.notes}`);
      
      // 安装更新
      await installUpdate();
    } else {
      console.log('已经是最新版本');
    }
  } catch (error) {
    console.error('检查更新失败:', error);
  }
}
```

### 多平台构建与发布

#### 配置构建目标

在 `tauri.conf.json` 中配置：

```json
{
  "tauri": {
    "bundle": {
      "active": true,
      "targets": ["deb", "appimage", "msi", "app", "dmg", "updater"]
    }
  }
}
```

#### 使用 GitHub Actions 进行自动构建

创建 `.github/workflows/release.yml` 文件：

```yaml
name: Release
on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  release:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]
    runs-on: ${{ matrix.platform }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: 'npm'

      - name: Setup Rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          profile: minimal

      - name: Install dependencies (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.0-dev libappindicator3-dev librsvg2-dev patchelf

      - name: Install frontend dependencies
        run: npm install

      - name: Build frontend
        run: npm run build

      - name: Build the app
        uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: ${{ github.ref_name }}
          releaseName: 'App v__VERSION__'
          releaseBody: 'See the assets to download this version and install.'
          releaseDraft: true
          prerelease: false
```

#### 跨平台注意事项

**Windows**:
- 确保应用图标是 `.ico` 格式
- 考虑添加 Windows 安装程序自定义选项

**macOS**:
- 确保应用图标是 `.icns` 格式
- 考虑代码签名和公证

**Linux**:
- 提供多种包格式（deb、AppImage、rpm）
- 考虑桌面集成（.desktop 文件）

## 结语

Tauri 是一个强大而灵活的框架，适合构建高性能、安全且体积小的跨平台桌面应用。通过本教程，你已经从入门级了解到了 Tauri 的大师级特性，包括基本配置、前端框架集成、Rust 后端开发、命令系统、状态管理、文件系统访问、网络请求、插件开发、安全性考量、性能优化、自动更新和多平台构建与发布等。

继续深入学习和实践是掌握 Tauri 的关键。尝试构建实际项目，参与 Tauri 社区，并保持对 Tauri 生态系统的关注，将帮助你成为一名熟练的 Tauri 开发者。

## 参考资源

- [Tauri 官方文档](https://tauri.app/v1/guides/)
- [Tauri GitHub 仓库](https://github.com/tauri-apps/tauri)
- [Tauri API 参考](https://tauri.app/v1/api/)
- [Rust 官方文档](https://doc.rust-lang.org/)
- [Tauri 示例项目](https://github.com/tauri-apps/tauri/tree/dev/examples)

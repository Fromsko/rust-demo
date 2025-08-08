# Rust 学习项目

这个仓库包含了 Rust 语言、Tauri 和 Rocket 框架的学习资料和示例代码。

## 目录结构

- `docs/` - 教程文档
  - `rust.md` - Rust 语言教程
  - `tauri.md` - Tauri 开发教程
  - `rocket.md` - Rocket Web 框架教程

## Rust 安装指南

```bash
# macOS/Linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Windows
# 下载并运行 rustup-init.exe：https://rustup.rs/
```

验证安装：`rustc --version` 和 `cargo --version`

## Tauri 项目创建指南

### 前置条件

1. 安装 Rust 和 Cargo
2. 安装系统依赖

```bash
# macOS
xcode-select --install
brew install node

# Windows
# 安装 Visual Studio C++ 构建工具和 Node.js

# Linux
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev nodejs npm
```

### 创建 Tauri 项目

```bash
# 安装 Tauri CLI
npm install -g @tauri-apps/cli

# 创建新项目
npm create tauri-app@latest my-tauri-app

# 进入项目目录
cd my-tauri-app

# 开发模式运行
npm run tauri dev

# 构建发布版本
npm run tauri build
```

## Rocket 项目创建指南

### 创建 Rocket 项目

```bash
# 创建新项目
cargo new rocket-app
cd rocket-app

# 编辑 Cargo.toml 添加依赖
# [dependencies]
# rocket = "0.5.0"

# 编写基本应用 (src/main.rs)
# #[macro_use] extern crate rocket;
# 
# #[get("/")]
# fn index() -> &'static str {
#     "Hello, world!"
# }
# 
# #[launch]
# fn rocket() -> _ {
#     rocket::build().mount("/", routes![index])
# }

# 运行应用
cargo run
```

访问 http://localhost:8000 查看应用运行情况。

## 贡献

欢迎提交 Pull Request 或创建 Issue 来改进这个项目。

## 许可证

MIT
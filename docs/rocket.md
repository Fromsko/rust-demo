# Rocket Web 框架教程：从入门到大师

## 目录

- [Rocket Web 框架教程：从入门到大师](#rocket-web-框架教程从入门到大师)
  - [目录](#目录)
  - [入门篇](#入门篇)
    - [Rocket 简介](#rocket-简介)
    - [环境配置](#环境配置)
      - [安装 Rust](#安装-rust)
      - [使用 Rust 稳定版](#使用-rust-稳定版)
    - [创建第一个 Rocket 应用](#创建第一个-rocket-应用)
      - [创建新项目](#创建新项目)
      - [添加 Rocket 依赖](#添加-rocket-依赖)
      - [编写基本应用](#编写基本应用)
      - [运行应用](#运行应用)
    - [项目结构](#项目结构)
  - [基础篇](#基础篇)
    - [路由系统](#路由系统)
      - [基本路由](#基本路由)
      - [路由参数](#路由参数)
      - [路由守卫](#路由守卫)
      - [路由分组](#路由分组)
    - [请求处理](#请求处理)
      - [请求守卫](#请求守卫)
      - [表单数据](#表单数据)
      - [文件上传](#文件上传)
    - [响应生成](#响应生成)
      - [基本响应类型](#基本响应类型)
      - [JSON 响应](#json-响应)
      - [流式响应](#流式响应)
    - [模板渲染](#模板渲染)
      - [配置 Tera 模板](#配置-tera-模板)
      - [使用模板](#使用模板)
    - [静态文件](#静态文件)
  - [高阶篇](#高阶篇)
    - [表单处理](#表单处理)
      - [基本表单](#基本表单)
      - [表单验证](#表单验证)
      - [自定义验证器](#自定义验证器)
    - [JSON 处理](#json-处理)
      - [JSON 请求和响应](#json-请求和响应)
      - [错误处理](#错误处理)
    - [数据库集成](#数据库集成)
      - [使用 Diesel ORM](#使用-diesel-orm)
      - [使用 SQLx](#使用-sqlx)
    - [认证与授权](#认证与授权)
      - [基本认证](#基本认证)
      - [基于角色的授权](#基于角色的授权)
    - [中间件](#中间件)
      - [创建自定义 Fairing](#创建自定义-fairing)
      - [使用内置 Fairing](#使用内置-fairing)
  - [大师篇](#大师篇)
    - [测试](#测试)
      - [单元测试](#单元测试)
      - [集成测试](#集成测试)
    - [部署](#部署)
      - [配置文件](#配置文件)
      - [Docker 部署](#docker-部署)
      - [反向代理配置](#反向代理配置)
    - [性能优化](#性能优化)
      - [异步处理](#异步处理)
      - [缓存](#缓存)
      - [连接池优化](#连接池优化)
    - [WebSocket](#websocket)
      - [WebSocket 服务器](#websocket-服务器)
    - [异步处理](#异步处理-1)
      - [异步路由处理](#异步路由处理)
      - [异步数据库操作](#异步数据库操作)
      - [流式处理](#流式处理)
  - [结语](#结语)
  - [参考资源](#参考资源)

## 入门篇

### Rocket 简介

Rocket 是一个用 Rust 编写的 Web 框架，专注于易用性、可扩展性和安全性。它的主要特点包括：

- **类型安全**：利用 Rust 的类型系统确保请求处理的安全性
- **易用性**：提供直观的 API 和丰富的文档
- **高性能**：基于 Rust 的高性能特性
- **可扩展性**：模块化设计，易于扩展
- **安全性**：默认采用安全实践

Rocket 适合开发从简单的 API 到复杂的 Web 应用的各种项目。

### 环境配置

#### 安装 Rust

```bash
# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
# 或在 Windows 上下载并运行 rustup-init.exe

# 验证安装
rustc --version
cargo --version
```

#### 使用 Rust 稳定版

Rocket 0.5 及以上版本支持 Rust 稳定版：

```bash
# 确保使用最新的稳定版
rustup update stable
rustup default stable
```

### 创建第一个 Rocket 应用

#### 创建新项目

```bash
# 创建新项目
cargo new rocket-app
cd rocket-app
```

#### 添加 Rocket 依赖

编辑 `Cargo.toml` 文件：

```toml
[package]
name = "rocket-app"
version = "0.1.0"
edition = "2021"

[dependencies]
rocket = "0.5.0"
```

#### 编写基本应用

创建或编辑 `src/main.rs` 文件：

```rust
#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}
```

#### 运行应用

```bash
cargo run
```

应用将在 `http://localhost:8000` 启动。

### 项目结构

一个典型的 Rocket 项目结构如下：

```
rocket-app/
├── Cargo.toml          # 项目依赖配置
├── Cargo.lock          # 锁定依赖版本
├── src/
│   ├── main.rs         # 主入口文件
│   ├── routes/         # 路由处理函数
│   │   ├── mod.rs      # 路由模块导出
│   │   ├── users.rs    # 用户相关路由
│   │   └── posts.rs    # 文章相关路由
│   ├── models/         # 数据模型
│   │   ├── mod.rs      # 模型模块导出
│   │   ├── user.rs     # 用户模型
│   │   └── post.rs     # 文章模型
│   ├── db.rs           # 数据库连接和操作
│   └── config.rs       # 配置管理
├── templates/          # 模板文件
│   ├── base.html.tera  # 基础模板
│   ├── index.html.tera # 首页模板
│   └── user.html.tera  # 用户页模板
└── static/             # 静态文件
    ├── css/            # CSS 文件
    ├── js/             # JavaScript 文件
    └── images/         # 图片文件
```

## 基础篇

### 路由系统

Rocket 的路由系统基于属性宏，使用简单直观。

#### 基本路由

```rust
#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/about")]
fn about() -> &'static str {
    "About page"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index, about])
}
```

#### 路由参数

```rust
// 路径参数
#[get("/user/<id>")]
fn user(id: usize) -> String {
    format!("User ID: {}", id)
}

// 多个路径参数
#[get("/user/<id>/posts/<post_id>")]
fn user_post(id: usize, post_id: usize) -> String {
    format!("User ID: {}, Post ID: {}", id, post_id)
}

// 查询参数
#[get("/search?<query>&<page>")]
fn search(query: String, page: Option<usize>) -> String {
    let page = page.unwrap_or(1);
    format!("Search for '{}' on page {}", query, page)
}
```

#### 路由守卫

```rust
// 只接受特定值
#[get("/user/<id>", rank = 2)]
fn user(id: usize) -> String {
    format!("User ID: {}", id)
}

#[get("/user/admin", rank = 1)]
fn admin() -> &'static str {
    "Admin page"
}

// 使用自定义类型作为守卫
struct Admin(usize);

#[get("/admin/<id>")]
fn admin_page(id: Admin) -> String {
    format!("Admin ID: {}", id.0)
}

// 实现 FromParam 特质
impl<'r> FromParam<'r> for Admin {
    type Error = &'static str;

    fn from_param(param: &'r str) -> Result<Self, Self::Error> {
        let id = param.parse::<usize>().map_err(|_| "Invalid ID")?;
        if id > 100 {  // 假设 ID > 100 是管理员
            Ok(Admin(id))
        } else {
            Err("Not an admin")
        }
    }
}
```

#### 路由分组

```rust
mod api {
    use rocket::serde::json::Json;
    use serde::{Serialize, Deserialize};

    #[derive(Serialize, Deserialize)]
    pub struct User {
        id: usize,
        name: String,
    }

    #[get("/users")]
    pub fn list_users() -> Json<Vec<User>> {
        Json(vec![
            User { id: 1, name: "Alice".into() },
            User { id: 2, name: "Bob".into() },
        ])
    }

    #[get("/users/<id>")]
    pub fn get_user(id: usize) -> Option<Json<User>> {
        if id == 1 {
            Some(Json(User { id: 1, name: "Alice".into() }))
        } else {
            None
        }
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, about])
        .mount("/api/v1", routes![api::list_users, api::get_user])
}
```

### 请求处理

Rocket 提供了多种方式来处理请求数据。

#### 请求守卫

请求守卫允许你验证请求的各个方面，如头部、Cookie 等。

```rust
use rocket::http::{Cookie, CookieJar};
use rocket::request::{self, FromRequest, Request};
use rocket::outcome::Outcome;

// 自定义请求守卫
struct User {
    id: usize,
    username: String,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for User {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        // 从 cookie 中获取用户信息
        let cookies = request.cookies();
        let user_id = cookies.get("user_id")
            .and_then(|cookie| cookie.value().parse::<usize>().ok());
        let username = cookies.get("username")
            .map(|cookie| cookie.value().to_string());

        match (user_id, username) {
            (Some(id), Some(username)) => Outcome::Success(User { id, username }),
            _ => Outcome::Forward(()),
        }
    }
}

// 使用请求守卫
#[get("/dashboard")]
fn dashboard(user: User) -> String {
    format!("Welcome to your dashboard, {}!", user.username)
}

// 使用 Cookie
#[get("/login/<username>")]
fn login(username: String, cookies: &CookieJar<'_>) -> &'static str {
    cookies.add(Cookie::new("username", username));
    cookies.add(Cookie::new("user_id", "1"));
    "Logged in successfully"
}
```

#### 表单数据

```rust
use rocket::form::Form;
use serde::{Serialize, Deserialize};

#[derive(FromForm)]
struct LoginForm<'r> {
    username: &'r str,
    password: &'r str,
    #[field(default = false)]
    remember: bool,
}

#[post("/login", data = "<form>")]
fn login(form: Form<LoginForm<'_>>) -> String {
    format!(
        "Username: {}, Password: {}, Remember: {}",
        form.username, form.password, form.remember
    )
}
```

#### 文件上传

```rust
use rocket::fs::TempFile;
use rocket::form::Form;

#[derive(FromForm)]
struct Upload<'r> {
    file: TempFile<'r>,
    description: String,
}

#[post("/upload", data = "<form>")]
async fn upload(mut form: Form<Upload<'_>>) -> std::io::Result<String> {
    form.file.persist_to(format!("uploads/{}", form.file.name().unwrap())).await?;
    Ok(format!("File '{}' uploaded with description: {}", form.file.name().unwrap(), form.description))
}
```

### 响应生成

Rocket 支持多种响应类型。

#### 基本响应类型

```rust
// 字符串响应
#[get("/string")]
fn string() -> &'static str {
    "This is a string response"
}

// 自定义状态码
use rocket::http::Status;

#[get("/not-found")]
fn not_found() -> (Status, &'static str) {
    (Status::NotFound, "Resource not found")
}

// 重定向
use rocket::response::Redirect;

#[get("/redirect")]
fn redirect() -> Redirect {
    Redirect::to(uri!(index))
}

// 自定义响应
use rocket::response::{self, Response, Responder};
use rocket::http::ContentType;
use std::io::Cursor;

struct CustomResponse {
    content: String,
}

impl<'r> Responder<'r, 'static> for CustomResponse {
    fn respond_to(self, _: &'r Request<'_>) -> response::Result<'static> {
        Response::build()
            .header(ContentType::Plain)
            .sized_body(self.content.len(), Cursor::new(self.content))
            .ok()
    }
}

#[get("/custom")]
fn custom() -> CustomResponse {
    CustomResponse {
        content: "This is a custom response".into(),
    }
}
```

#### JSON 响应

```rust
use rocket::serde::{Serialize, json::Json};

#[derive(Serialize)]
struct User {
    id: usize,
    name: String,
    email: String,
}

#[get("/user/<id>")]
fn get_user(id: usize) -> Json<User> {
    Json(User {
        id,
        name: "John Doe".into(),
        email: "john@example.com".into(),
    })
}
```

#### 流式响应

```rust
use rocket::response::stream::{Event, EventStream};
use rocket::tokio::time::{self, Duration};

#[get("/events")]
fn events() -> EventStream![] {
    EventStream! {
        let mut interval = time::interval(Duration::from_secs(1));
        let mut count = 0;
        loop {
            yield Event::data(format!("count: {}", count));
            count += 1;
            interval.tick().await;
        }
    }
}
```

### 模板渲染

Rocket 支持多种模板引擎，如 Tera、Handlebars 等。

#### 配置 Tera 模板

首先，添加依赖：

```toml
[dependencies]
rocket = "0.5.0"
rocket_dyn_templates = { version = "0.1.0", features = ["tera"] }
```

创建模板目录和文件：

```
templates/
├── base.html.tera
└── index.html.tera
```

`base.html.tera`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{% block title %}Rocket App{% endblock %}</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <header>
        <h1>Rocket App</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        {% block content %}{% endblock %}
    </main>
    <footer>
        <p>&copy; 2023 Rocket App</p>
    </footer>
</body>
</html>
```

`index.html.tera`:

```html
{% extends "base" %}

{% block title %}Home - Rocket App{% endblock %}

{% block content %}
    <h2>Welcome, {{ name }}!</h2>
    <p>This is a Rocket application with Tera templates.</p>
    
    {% if items %}
        <ul>
            {% for item in items %}
                <li>{{ item }}</li>
            {% endfor %}
        </ul>
    {% else %}
        <p>No items found.</p>
    {% endif %}
{% endblock %}
```

#### 使用模板

```rust
use rocket_dyn_templates::{Template, context};

#[get("/")]
fn index() -> Template {
    Template::render("index", context! {
        name: "User",
        items: vec!["Item 1", "Item 2", "Item 3"],
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index])
        .attach(Template::fairing())
}
```

### 静态文件

Rocket 可以轻松地提供静态文件。

```rust
use rocket::fs::{FileServer, relative};

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, about])
        .mount("/static", FileServer::from(relative!("static")))
}
```

创建静态文件目录：

```
static/
├── css/
│   └── style.css
├── js/
│   └── app.js
└── images/
    └── logo.png
```

## 高阶篇

### 表单处理

Rocket 提供了强大的表单处理功能。

#### 基本表单

```rust
use rocket::form::{Form, FromForm};

#[derive(FromForm)]
struct UserForm<'r> {
    name: &'r str,
    email: &'r str,
    #[field(validate = range(18..=120))]
    age: u8,
}

#[get("/register")]
fn register_form() -> Template {
    Template::render("register", context! {})
}

#[post("/register", data = "<form>")]
fn register(form: Form<UserForm<'_>>) -> Template {
    Template::render("success", context! {
        name: form.name,
        email: form.email,
        age: form.age,
    })
}
```

#### 表单验证

```rust
use rocket::form::{Form, FromForm, Contextual};

#[derive(FromForm)]
struct UserForm<'r> {
    #[field(validate = len(3..30))]
    name: &'r str,
    
    #[field(validate = contains('@'))]
    email: &'r str,
    
    #[field(validate = range(18..=120))]
    age: u8,
    
    #[field(validate = eq(true))]
    accept_terms: bool,
}

#[post("/register", data = "<form>")]
fn register(form: Form<Contextual<'_, UserForm<'_>>>) -> Template {
    if let Some(ref user) = form.value {
        // 表单验证通过
        Template::render("success", context! {
            name: user.name,
            email: user.email,
            age: user.age,
        })
    } else {
        // 表单验证失败
        Template::render("register", context! {
            form: &form,
            errors: form.context.errors().map(|err| err.to_string()).collect::<Vec<_>>(),
        })
    }
}
```

#### 自定义验证器

```rust
use rocket::form::{FromFormField, ValueField};

// 自定义验证器
#[derive(Debug)]
struct StrongPassword<'r>(&'r str);

#[rocket::async_trait]
impl<'r> FromFormField<'r> for StrongPassword<'r> {
    fn from_value(field: ValueField<'r>) -> rocket::form::Result<'r, Self> {
        let password = field.value;
        
        // 密码强度验证
        if password.len() < 8 {
            return Err(field.error("Password must be at least 8 characters"));
        }
        
        if !password.chars().any(|c| c.is_uppercase()) {
            return Err(field.error("Password must contain at least one uppercase letter"));
        }
        
        if !password.chars().any(|c| c.is_lowercase()) {
            return Err(field.error("Password must contain at least one lowercase letter"));
        }
        
        if !password.chars().any(|c| c.is_numeric()) {
            return Err(field.error("Password must contain at least one number"));
        }
        
        Ok(StrongPassword(password))
    }
}

#[derive(FromForm)]
struct RegisterForm<'r> {
    username: &'r str,
    password: StrongPassword<'r>,
}

#[post("/register", data = "<form>")]
fn register(form: Form<RegisterForm<'_>>) -> &'static str {
    "Registration successful!"
}
```

### JSON 处理

Rocket 提供了完整的 JSON 支持。

#### JSON 请求和响应

```rust
use rocket::serde::{Serialize, Deserialize, json::Json};

#[derive(Serialize, Deserialize)]
struct User {
    id: Option<usize>,
    name: String,
    email: String,
}

// JSON 响应
#[get("/users/<id>")]
fn get_user(id: usize) -> Option<Json<User>> {
    if id == 1 {
        Some(Json(User {
            id: Some(1),
            name: "John Doe".into(),
            email: "john@example.com".into(),
        }))
    } else {
        None
    }
}

// JSON 请求
#[post("/users", data = "<user>")]
fn create_user(user: Json<User>) -> Json<User> {
    // 在实际应用中，这里会保存用户到数据库
    let mut new_user = user.0;
    new_user.id = Some(42); // 假设这是新分配的 ID
    Json(new_user)
}
```

#### 错误处理

```rust
use rocket::serde::{Serialize, json::Json};
use rocket::http::Status;
use rocket::response::status;

#[derive(Serialize)]
struct ApiError {
    code: u16,
    message: String,
}

#[derive(Serialize)]
struct ApiResponse<T> {
    success: bool,
    data: Option<T>,
    error: Option<ApiError>,
}

// 成功响应
#[get("/success")]
fn success() -> Json<ApiResponse<String>> {
    Json(ApiResponse {
        success: true,
        data: Some("Operation successful".into()),
        error: None,
    })
}

// 错误响应
#[get("/error")]
fn error() -> status::Custom<Json<ApiResponse<()>>> {
    status::Custom(
        Status::BadRequest,
        Json(ApiResponse {
            success: false,
            data: None,
            error: Some(ApiError {
                code: 400,
                message: "Bad request".into(),
            }),
        })
    )
}
```

### 数据库集成

Rocket 可以与各种数据库集成，如 PostgreSQL、MySQL、SQLite 等。

#### 使用 Diesel ORM

首先，添加依赖：

```toml
[dependencies]
rocket = "0.5.0"
diesel = { version = "2.0.0", features = ["postgres", "r2d2"] }
rocket_sync_db_pools = { version = "0.1.0", features = ["diesel_postgres_pool"] }
```

配置数据库连接：

```rust
use rocket_sync_db_pools::{database, diesel};

#[database("postgres_db")]
struct DbConn(diesel::PgConnection);

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![/* ... */])
        .attach(DbConn::fairing())
}
```

创建 `Rocket.toml` 配置文件：

```toml
[default.databases.postgres_db]
url = "postgres://username:password@localhost/dbname"
```

定义模型和操作：

```rust
use diesel::prelude::*;
use serde::{Serialize, Deserialize};

// 定义数据库模式
table! {
    users (id) {
        id -> Integer,
        name -> Text,
        email -> Text,
    }
}

// 定义模型
#[derive(Queryable, Serialize)]
struct User {
    id: i32,
    name: String,
    email: String,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = users)]
struct NewUser {
    name: String,
    email: String,
}

// 数据库操作
#[get("/users")]
async fn list_users(conn: DbConn) -> Json<Vec<User>> {
    let users = conn.run(|c| {
        users::table
            .load::<User>(c)
            .expect("Error loading users")
    }).await;
    
    Json(users)
}

#[post("/users", data = "<new_user>")]
async fn create_user(conn: DbConn, new_user: Json<NewUser>) -> Json<User> {
    let user = conn.run(move |c| {
        diesel::insert_into(users::table)
            .values(&new_user.0)
            .get_result::<User>(c)
            .expect("Error saving new user")
    }).await;
    
    Json(user)
}
```

#### 使用 SQLx

首先，添加依赖：

```toml
[dependencies]
rocket = "0.5.0"
sqlx = { version = "0.6", features = ["runtime-tokio-rustls", "postgres", "macros"] }
```

配置数据库连接：

```rust
use rocket::fairing::AdHoc;
use sqlx::{PgPool, postgres::PgPoolOptions};

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(AdHoc::on_ignite("Database Setup", |rocket| async {
            let pool = PgPoolOptions::new()
                .max_connections(5)
                .connect("postgres://username:password@localhost/dbname")
                .await
                .expect("Failed to connect to database");
            
            rocket.manage(pool)
        }))
        .mount("/", routes![/* ... */])
}
```

定义模型和操作：

```rust
use rocket::State;
use sqlx::{FromRow, PgPool};
use serde::{Serialize, Deserialize};

#[derive(FromRow, Serialize)]
struct User {
    id: i32,
    name: String,
    email: String,
}

#[derive(Deserialize)]
struct NewUser {
    name: String,
    email: String,
}

#[get("/users")]
async fn list_users(pool: &State<PgPool>) -> Json<Vec<User>> {
    let users = sqlx::query_as::<_, User>("SELECT * FROM users")
        .fetch_all(pool.inner())
        .await
        .expect("Failed to fetch users");
    
    Json(users)
}

#[post("/users", data = "<new_user>")]
async fn create_user(pool: &State<PgPool>, new_user: Json<NewUser>) -> Json<User> {
    let user = sqlx::query_as::<_, User>(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email"
    )
    .bind(&new_user.name)
    .bind(&new_user.email)
    .fetch_one(pool.inner())
    .await
    .expect("Failed to create user");
    
    Json(user)
}
```

### 认证与授权

Rocket 可以实现各种认证和授权机制。

#### 基本认证

```rust
use rocket::http::{Status, Cookie, CookieJar};
use rocket::request::{self, FromRequest, Request};
use rocket::outcome::Outcome;
use rocket::response::Redirect;

struct User {
    id: i32,
    username: String,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for User {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        let cookies = request.cookies();
        
        // 从 cookie 中获取用户 ID
        match cookies.get_private("user_id").and_then(|c| c.value().parse::<i32>().ok()) {
            Some(id) => {
                // 在实际应用中，这里会从数据库查询用户信息
                let username = cookies.get_private("username")
                    .map(|c| c.value().to_string())
                    .unwrap_or_else(|| "Unknown".into());
                
                Outcome::Success(User { id, username })
            },
            None => Outcome::Forward(()),
        }
    }
}

#[post("/login", data = "<form>")]
fn login(form: Form<LoginForm<'_>>, cookies: &CookieJar<'_>) -> Redirect {
    // 在实际应用中，这里会验证用户凭据
    if form.username == "admin" && form.password == "password" {
        cookies.add_private(Cookie::new("user_id", "1"));
        cookies.add_private(Cookie::new("username", form.username));
        Redirect::to(uri!(dashboard))
    } else {
        Redirect::to(uri!(login_page))
    }
}

#[get("/dashboard")]
fn dashboard(user: User) -> Template {
    Template::render("dashboard", context! {
        username: user.username,
    })
}

#[get("/dashboard", rank = 2)]
fn login_required() -> Redirect {
    Redirect::to(uri!(login_page))
}

#[get("/login")]
fn login_page() -> Template {
    Template::render("login", context! {})
}

#[get("/logout")]
fn logout(cookies: &CookieJar<'_>) -> Redirect {
    cookies.remove_private(Cookie::named("user_id"));
    cookies.remove_private(Cookie::named("username"));
    Redirect::to(uri!(login_page))
}
```

#### 基于角色的授权

```rust
use rocket::http::Status;
use rocket::request::{self, FromRequest, Request};
use rocket::outcome::Outcome;

enum Role {
    User,
    Admin,
}

struct AuthenticatedUser {
    id: i32,
    username: String,
    role: Role,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthenticatedUser {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        let cookies = request.cookies();
        
        // 从 cookie 中获取用户信息
        let user_id = cookies.get_private("user_id").and_then(|c| c.value().parse::<i32>().ok());
        let username = cookies.get_private("username").map(|c| c.value().to_string());
        let role_str = cookies.get_private("role").map(|c| c.value().to_string());
        
        match (user_id, username, role_str) {
            (Some(id), Some(username), Some(role_str)) => {
                let role = if role_str == "admin" {
                    Role::Admin
                } else {
                    Role::User
                };
                
                Outcome::Success(AuthenticatedUser {
                    id,
                    username,
                    role,
                })
            },
            _ => Outcome::Forward(()),
        }
    }
}

// 只允许管理员访问的路由
#[get("/admin/dashboard")]
fn admin_dashboard(user: AuthenticatedUser) -> Result<Template, Status> {
    match user.role {
        Role::Admin => Ok(Template::render("admin/dashboard", context! {
            username: user.username,
        })),
        _ => Err(Status::Forbidden),
    }
}

// 使用宏简化角色检查
macro_rules! require_role {
    ($user:expr, $role:path) => {
        match $user.role {
            $role => Ok(()),
            _ => Err(Status::Forbidden),
        }
    };
}

#[get("/admin/users")]
fn admin_users(user: AuthenticatedUser) -> Result<Template, Status> {
    require_role!(user, Role::Admin)?;
    
    Ok(Template::render("admin/users", context! {
        username: user.username,
    }))
}
```

### 中间件

Rocket 使用 Fairing 实现中间件功能。

#### 创建自定义 Fairing

```rust
use rocket::{Rocket, Build};
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::request::Request;
use rocket::response::Response;
use std::time::Instant;

// 请求计时中间件
struct RequestTimer;

#[rocket::async_trait]
impl Fairing for RequestTimer {
    fn info(&self) -> Info {
        Info {
            name: "Request Timer",
            kind: Kind::Request | Kind::Response,
        }
    }

    async fn on_request(&self, request: &mut Request<'_>, _: &mut rocket::Data<'_>) {
        // 存储请求开始时间
        request.local_cache(|| Instant::now());
    }

    async fn on_response<'r>(&self, request: &'r Request<'_>, response: &mut Response<'r>) {
        // 获取请求开始时间
        let start_time = request.local_cache::<Instant>();
        let duration = start_time.elapsed();
        
        // 添加处理时间到响应头
        response.set_header(Header::new(
            "X-Response-Time",
            format!("{} ms", duration.as_millis())
        ));
    }
}

// 安全头中间件
struct SecurityHeaders;

#[rocket::async_trait]
impl Fairing for SecurityHeaders {
    fn info(&self) -> Info {
        Info {
            name: "Security Headers",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, _: &'r Request<'_>, response: &mut Response<'r>) {
        // 添加安全相关的 HTTP 头
        response.set_header(Header::new("X-Frame-Options", "SAMEORIGIN"));
        response.set_header(Header::new("X-XSS-Protection", "1; mode=block"));
        response.set_header(Header::new("X-Content-Type-Options", "nosniff"));
        response.set_header(Header::new(
            "Content-Security-Policy",
            "default-src 'self'; script-src 'self'"
        ));
    }
}

// 注册中间件
#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![/* ... */])
        .attach(RequestTimer)
        .attach(SecurityHeaders)
}
```

#### 使用内置 Fairing

```rust
use rocket::fairing::AdHoc;
use rocket::http::Method;
use rocket_cors::{AllowedHeaders, AllowedOrigins};

#[launch]
fn rocket() -> _ {
    // CORS 配置
    let cors = rocket_cors::CorsOptions {
        allowed_origins: AllowedOrigins::all(),
        allowed_methods: vec![Method::Get, Method::Post, Method::Put, Method::Delete]
            .into_iter()
            .map(From::from)
            .collect(),
        allowed_headers: AllowedHeaders::some(&["Authorization", "Accept", "Content-Type"]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .expect("CORS configuration error");

    rocket::build()
        .mount("/", routes![/* ... */])
        // 添加 AdHoc 中间件
        .attach(AdHoc::on_liftoff("Liftoff Message", |_| Box::pin(async move {
            println!("🚀 Rocket has lifted off!");
        })))
        .attach(AdHoc::on_request("Request Logger", |req, _| Box::pin(async move {
            println!("Request: {} {}", req.method(), req.uri());
        })))
        // 添加 CORS 中间件
        .attach(cors)
}
```

## 大师篇

### 测试

Rocket 提供了强大的测试支持。

#### 单元测试

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use rocket::local::blocking::Client;
    use rocket::http::Status;

    #[test]
    fn test_index() {
        // 创建测试客户端
        let client = Client::tracked(rocket()).expect("valid rocket instance");
        
        // 发送请求
        let response = client.get("/").dispatch();
        
        // 验证响应
        assert_eq!(response.status(), Status::Ok);
        assert_eq!(response.into_string().unwrap(), "Hello, world!");
    }
    
    #[test]
    fn test_user() {
        let client = Client::tracked(rocket()).expect("valid rocket instance");
        
        let response = client.get("/user/42").dispatch();
        
        assert_eq!(response.status(), Status::Ok);
        assert_eq!(response.into_string().unwrap(), "User ID: 42");
    }
}
```

#### 集成测试

```rust
#[cfg(test)]
mod integration_tests {
    use super::rocket;
    use rocket::local::blocking::Client;
    use rocket::http::{Status, ContentType, Cookie};
    use rocket::serde::json;

    #[test]
    fn test_login_flow() {
        let client = Client::tracked(rocket()).expect("valid rocket instance");
        
        // 测试登录页面
        let response = client.get("/login").dispatch();
        assert_eq!(response.status(), Status::Ok);
        
        // 测试登录请求
        let response = client.post("/login")
            .header(ContentType::Form)
            .body("username=admin&password=password")
            .dispatch();
        
        assert_eq!(response.status(), Status::SeeOther); // 重定向
        
        // 获取 cookie
        let cookies: Vec<_> = response.cookies().collect();
        assert!(cookies.iter().any(|c| c.name() == "user_id"));
        
        // 使用 cookie 访问受保护的页面
        let response = client.get("/dashboard")
            .cookies(cookies)
            .dispatch();
        
        assert_eq!(response.status(), Status::Ok);
        assert!(response.into_string().unwrap().contains("Welcome"));
    }
    
    #[test]
    fn test_api() {
        let client = Client::tracked(rocket()).expect("valid rocket instance");
        
        // 测试 GET 请求
        let response = client.get("/api/v1/users/1").dispatch();
        assert_eq!(response.status(), Status::Ok);
        assert_eq!(response.content_type(), Some(ContentType::JSON));
        
        let user: json::Value = serde_json::from_str(&response.into_string().unwrap()).unwrap();
        assert_eq!(user["id"], 1);
        assert_eq!(user["name"], "Alice");
        
        // 测试 POST 请求
        let response = client.post("/api/v1/users")
            .header(ContentType::JSON)
            .body(r#"{"name":"Eve","email":"eve@example.com"}"#)
            .dispatch();
        
        assert_eq!(response.status(), Status::Ok);
        
        let user: json::Value = serde_json::from_str(&response.into_string().unwrap()).unwrap();
        assert_eq!(user["name"], "Eve");
        assert_eq!(user["email"], "eve@example.com");
        assert!(user["id"].is_number());
    }
}
```

### 部署

#### 配置文件

Rocket 使用 `Rocket.toml` 文件进行配置：

```toml
# 默认配置（开发环境）
[default]
address = "localhost"
port = 8000
workers = 4
keep_alive = 5
log_level = "normal"
secret_key = "hPRYyVRiMyxpw5sBB1XeCMN1kFsDCqKvBi2QJxBVHQk="

# 生产环境配置
[production]
address = "0.0.0.0"
port = 8000
workers = 12
keep_alive = 5
log_level = "critical"
secret_key = "${ROCKET_SECRET_KEY}"

# 数据库配置
[default.databases.postgres]
url = "postgres://username:password@localhost/dbname_dev"

[production.databases.postgres]
url = "${DATABASE_URL}"
```

#### Docker 部署

创建 `Dockerfile`：

```dockerfile
# 构建阶段
FROM rust:1.67 as builder

WORKDIR /usr/src/app
COPY . .

RUN cargo build --release

# 运行阶段
FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/local/bin

COPY --from=builder /usr/src/app/target/release/rocket-app .
COPY --from=builder /usr/src/app/Rocket.toml .
COPY --from=builder /usr/src/app/templates ./templates
COPY --from=builder /usr/src/app/static ./static

ENV ROCKET_ENV=production
ENV ROCKET_ADDRESS=0.0.0.0

EXPOSE 8000

CMD ["./rocket-app"]
```

创建 `docker-compose.yml`：

```yaml
version: '3'

services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - ROCKET_SECRET_KEY=your_secret_key_here
      - DATABASE_URL=postgres://username:password@db/dbname
    depends_on:
      - db
    restart: always

  db:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=username
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=dbname
    restart: always

volumes:
  postgres_data:
```

#### 反向代理配置

**Nginx 配置**：

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static {
        alias /path/to/your/static/files;
        expires 30d;
    }
}
```

**使用 Let's Encrypt 配置 HTTPS**：

```bash
# 安装 certbot
apt-get update
apt-get install certbot python3-certbot-nginx

# 获取并配置证书
certbot --nginx -d example.com
```

### 性能优化

#### 异步处理

```rust
use rocket::tokio;
use std::time::Duration;

// 异步处理耗时操作
#[get("/async-task")]
async fn async_task() -> String {
    // 模拟耗时操作
    tokio::time::sleep(Duration::from_secs(2)).await;
    "Async task completed".to_string()
}

// 并行处理多个异步任务
#[get("/parallel")]
async fn parallel_tasks() -> String {
    let task1 = tokio::spawn(async {
        tokio::time::sleep(Duration::from_secs(1)).await;
        "Task 1 result"
    });
    
    let task2 = tokio::spawn(async {
        tokio::time::sleep(Duration::from_secs(2)).await;
        "Task 2 result"
    });
    
    // 等待所有任务完成
    let (result1, result2) = tokio::join!(task1, task2);
    
    format!(
        "{}, {}",
        result1.unwrap_or("Task 1 failed"),
        result2.unwrap_or("Task 2 failed")
    )
}
```

#### 缓存

```rust
use std::sync::Arc;
use rocket::tokio::sync::RwLock;
use std::collections::HashMap;
use std::time::{Duration, Instant};
use rocket::State;

// 简单的缓存实现
struct Cache<T> {
    data: HashMap<String, (T, Instant)>,
    ttl: Duration,
}

impl<T: Clone> Cache<T> {
    fn new(ttl: Duration) -> Self {
        Cache {
            data: HashMap::new(),
            ttl,
        }
    }
    
    fn get(&self, key: &str) -> Option<T> {
        self.data.get(key).and_then(|(value, timestamp)| {
            if timestamp.elapsed() < self.ttl {
                Some(value.clone())
            } else {
                None
            }
        })
    }
    
    fn set(&mut self, key: String, value: T) {
        self.data.insert(key, (value, Instant::now()));
    }
    
    // 清理过期项
    fn cleanup(&mut self) {
        self.data.retain(|_, (_, timestamp)| timestamp.elapsed() < self.ttl);
    }
}

type UserCache = Arc<RwLock<Cache<User>>>;

// 使用缓存
#[get("/users/<id>")]
async fn get_user(id: usize, cache: &State<UserCache>, db: DbConn) -> Option<Json<User>> {
    // 尝试从缓存获取
    let cache_key = format!("user:{}", id);
    
    if let Some(user) = cache.read().await.get(&cache_key) {
        return Some(Json(user));
    }
    
    // 从数据库获取
    let user = db.run(move |c| {
        users::table
            .find(id)
            .first::<User>(c)
            .optional()
            .expect("Error loading user")
    }).await?;
    
    // 更新缓存
    if let Some(ref user) = user {
        cache.write().await.set(cache_key, user.clone());
    }
    
    user.map(Json)
}

// 定期清理缓存
#[launch]
fn rocket() -> _ {
    // 创建缓存，TTL 为 5 分钟
    let cache = Arc::new(RwLock::new(Cache::<User>::new(Duration::from_secs(300))));
    let cache_clone = cache.clone();
    
    // 启动清理任务
    tokio::spawn(async move {
        let mut interval = tokio::time::interval(Duration::from_secs(60));
        loop {
            interval.tick().await;
            cache_clone.write().await.cleanup();
        }
    });
    
    rocket::build()
        .manage(cache)
        .mount("/", routes![get_user])
}
```

#### 连接池优化

```rust
// 在 Rocket.toml 中配置连接池
[default.databases.postgres]
url = "postgres://username:password@localhost/dbname"
pool_size = 10
timeout = 5

// 使用 r2d2 连接池
use rocket_sync_db_pools::{database, r2d2};

#[database("postgres")]
struct DbConn(r2d2::Pool<r2d2::ConnectionManager<PgConnection>>);
```

### WebSocket

Rocket 可以与 WebSocket 库集成，如 `tokio-tungstenite`。

#### WebSocket 服务器

首先，添加依赖：

```toml
[dependencies]
rocket = "0.5.0"
tokio-tungstenite = "0.18"
futures-util = "0.3"
```

实现 WebSocket 处理：

```rust
use rocket::response::content;
use rocket::tokio::net::{TcpListener, TcpStream};
use rocket::tokio::sync::{mpsc, broadcast};
use tokio_tungstenite::{accept_async, tungstenite::protocol::Message};
use futures_util::{SinkExt, StreamExt};
use std::sync::Arc;

// WebSocket 处理函数
async fn handle_websocket_connection(stream: TcpStream, tx: broadcast::Sender<String>) {
    // 将 TCP 连接升级为 WebSocket 连接
    let ws_stream = accept_async(stream).await.expect("Failed to accept WebSocket");
    let (mut ws_sender, mut ws_receiver) = ws_stream.split();
    
    // 创建接收通道
    let mut rx = tx.subscribe();
    
    // 处理接收到的消息
    let mut recv_task = rocket::tokio::spawn(async move {
        while let Some(Ok(msg)) = ws_receiver.next().await {
            if msg.is_text() || msg.is_binary() {
                let msg_text = msg.to_text().unwrap_or("").to_string();
                // 广播消息给所有连接
                if !msg_text.is_empty() {
                    if let Err(e) = tx.send(msg_text) {
                        eprintln!("Broadcasting error: {}", e);
                        break;
                    }
                }
            } else if msg.is_close() {
                break;
            }
        }
    });
    
    // 转发广播消息到 WebSocket
    let mut send_task = rocket::tokio::spawn(async move {
        while let Ok(msg) = rx.recv().await {
            if ws_sender.send(Message::Text(msg)).await.is_err() {
                break;
            }
        }
    });
    
    // 等待任一任务完成
    rocket::tokio::select! {
        _ = (&mut recv_task) => send_task.abort(),
        _ = (&mut send_task) => recv_task.abort(),
    };
}

// 启动 WebSocket 服务器
#[launch]
fn rocket() -> _ {
    // 创建广播通道
    let (tx, _) = broadcast::channel::<String>(1000);
    let tx_clone = tx.clone();
    
    // 启动 WebSocket 监听器
    rocket::tokio::spawn(async move {
        let listener = TcpListener::bind("127.0.0.1:9001").await.expect("Failed to bind");
        println!("WebSocket server listening on ws://127.0.0.1:9001");
        
        while let Ok((stream, _)) = listener.accept().await {
            let tx = tx_clone.clone();
            rocket::tokio::spawn(async move {
                handle_websocket_connection(stream, tx).await;
            });
        }
    });
    
    // 提供 WebSocket 客户端页面
    rocket::build()
        .mount("/", routes![index])
        .manage(tx)
}

// 提供 WebSocket 客户端页面
#[get("/")]
fn index() -> content::RawHtml<&'static str> {
    content::RawHtml(r#"
        <!DOCTYPE html>
        <html>
        <head>
            <title>WebSocket Chat</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                #messages { height: 300px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; }
                #input { width: 80%; padding: 5px; }
                button { padding: 5px 10px; }
            </style>
        </head>
        <body>
            <h1>WebSocket Chat</h1>
            <div id="messages"></div>
            <input type="text" id="input" placeholder="Type a message...">
            <button onclick="sendMessage()">Send</button>
            
            <script>
                const messagesDiv = document.getElementById('messages');
                const input = document.getElementById('input');
                const ws = new WebSocket('ws://localhost:9001');
                
                ws.onopen = function() {
                    addMessage('System', 'Connected to server');
                };
                
                ws.onmessage = function(event) {
                    addMessage('Received', event.data);
                };
                
                ws.onclose = function() {
                    addMessage('System', 'Disconnected from server');
                };
                
                function sendMessage() {
                    if (input.value) {
                        ws.send(input.value);
                        addMessage('Sent', input.value);
                        input.value = '';
                    }
                }
                
                function addMessage(type, message) {
                    const messageElement = document.createElement('div');
                    messageElement.textContent = `[${type}] ${message}`;
                    messagesDiv.appendChild(messageElement);
                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                }
                
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                });
            </script>
        </body>
        </html>
    "#)
}
```

### 异步处理

Rocket 基于 Tokio 运行时，提供了强大的异步处理能力。

#### 异步路由处理

```rust
use rocket::tokio;
use std::time::Duration;

// 异步路由处理函数
#[get("/delay/<seconds>")]
async fn delay(seconds: u64) -> String {
    tokio::time::sleep(Duration::from_secs(seconds)).await;
    format!("Waited for {} seconds", seconds)
}

// 并发处理多个异步操作
#[get("/concurrent")]
async fn concurrent() -> String {
    let task1 = tokio::task::spawn(async {
        tokio::time::sleep(Duration::from_secs(1)).await;
        "Task 1 completed"
    });
    
    let task2 = tokio::task::spawn(async {
        tokio::time::sleep(Duration::from_secs(2)).await;
        "Task 2 completed"
    });
    
    let (result1, result2) = futures::join!(task1, task2);
    
    format!(
        "{}, {}",
        result1.unwrap_or_else(|_| "Task 1 failed"),
        result2.unwrap_or_else(|_| "Task 2 failed")
    )
}
```

#### 异步数据库操作

```rust
use rocket_sync_db_pools::diesel;

#[get("/users")]
async fn list_users(conn: DbConn) -> Json<Vec<User>> {
    // 在单独的线程中执行数据库操作
    let users = conn.run(|c| {
        users::table
            .load::<User>(c)
            .expect("Error loading users")
    }).await;
    
    Json(users)
}

// 并行执行多个数据库查询
#[get("/dashboard")]
async fn dashboard(conn: DbConn) -> Template {
    // 并行执行多个数据库查询
    let users_future = conn.run(|c| {
        users::table
            .limit(5)
            .load::<User>(c)
            .expect("Error loading users")
    });
    
    let posts_future = conn.run(|c| {
        posts::table
            .limit(10)
            .load::<Post>(c)
            .expect("Error loading posts")
    });
    
    let comments_future = conn.run(|c| {
        comments::table
            .limit(20)
            .load::<Comment>(c)
            .expect("Error loading comments")
    });
    
    // 等待所有查询完成
    let (users, posts, comments) = tokio::join!(users_future, posts_future, comments_future);
    
    Template::render("dashboard", context! {
        users: users,
        posts: posts,
        comments: comments,
    })
}
```

#### 流式处理

```rust
use rocket::response::stream::{Event, EventStream};
use rocket::tokio::sync::mpsc;
use rocket::tokio::time::{self, Duration};
use std::sync::atomic::{AtomicUsize, Ordering};

// 服务器发送事件 (SSE)
#[get("/events")]
async fn events() -> EventStream![] {
    let mut interval = time::interval(Duration::from_secs(1));
    
    EventStream! {
        let mut counter = 0;
        loop {
            interval.tick().await;
            counter += 1;
            yield Event::data(format!("{{\"counter\": {}}}", counter));
            
            if counter >= 10 {
                break;
            }
        }
    }
}

// 使用通道进行实时更新
#[get("/live-updates")]
async fn live_updates() -> EventStream![] {
    // 创建通道
    let (tx, mut rx) = mpsc::channel::<String>(100);
    
    // 存储发送者
    static NEXT_ID: AtomicUsize = AtomicUsize::new(0);
    let id = NEXT_ID.fetch_add(1, Ordering::Relaxed);
    
    // 将发送者存储在全局状态中（在实际应用中，你可能会使用 Rocket::State）
    // ...
    
    // 返回事件流
    EventStream! {
        while let Some(message) = rx.recv().await {
            yield Event::data(message);
        }
    }
}
```

## 结语

Rocket 是一个功能强大、类型安全且易于使用的 Rust Web 框架。通过本教程，你已经从入门级了解到了 Rocket 的大师级特性，包括路由系统、请求处理、响应生成、模板渲染、表单处理、JSON 处理、数据库集成、认证与授权、中间件、测试、部署、性能优化、WebSocket 和异步处理等。

继续深入学习和实践是掌握 Rocket 的关键。尝试构建实际项目，参与 Rocket 社区，并保持对 Rocket 生态系统的关注，将帮助你成为一名熟练的 Rocket 开发者。

## 参考资源

- [Rocket 官方文档](https://rocket.rs/v0.5/guide/)
- [Rocket GitHub 仓库](https://github.com/SergioBenitez/Rocket)
- [Rocket API 参考](https://api.rocket.rs/v0.5/rocket/)
- [Rust 官方文档](https://doc.rust-lang.org/)
- [Diesel ORM 文档](https://diesel.rs/guides/)
- [SQLx 文档](https://github.com/launchbadge/sqlx)

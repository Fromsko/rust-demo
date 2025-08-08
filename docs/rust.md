# Rust 语言教程：从入门到大师

## 目录

- [入门篇](#入门篇)
  - [Rust 简介](#rust-简介)
  - [安装与环境配置](#安装与环境配置)
  - [Hello World](#hello-world)
  - [Cargo 包管理器](#cargo-包管理器)
  - [基本语法](#基本语法)
- [基础篇](#基础篇)
  - [变量与数据类型](#变量与数据类型)
  - [控制流](#控制流)
  - [函数与方法](#函数与方法)
  - [所有权系统](#所有权系统)
  - [借用与引用](#借用与引用)
  - [结构体与枚举](#结构体与枚举)
- [高阶篇](#高阶篇)
  - [泛型](#泛型)
  - [特质（Trait）](#特质trait)
  - [生命周期](#生命周期)
  - [错误处理](#错误处理)
  - [测试](#测试)
  - [并发编程](#并发编程)
- [大师篇](#大师篇)
  - [高级特质](#高级特质)
  - [宏编程](#宏编程)
  - [unsafe Rust](#unsafe-rust)
  - [FFI 与外部代码交互](#ffi-与外部代码交互)
  - [性能优化](#性能优化)
  - [设计模式](#设计模式)

## 入门篇

### Rust 简介

Rust 是一门系统级编程语言，专注于安全性、并发性和性能。它由 Mozilla 研究院开发，并于 2015 年发布 1.0 版本。Rust 的主要特点包括：

- **内存安全**：无需垃圾回收即可保证内存安全
- **并发安全**：通过所有权系统避免数据竞争
- **零成本抽象**：高级语言特性不会带来运行时开销
- **跨平台**：支持多种操作系统和硬件架构

Rust 适合开发需要高性能、高可靠性的系统，如操作系统、游戏引擎、浏览器组件和嵌入式系统等。

### 安装与环境配置

#### 使用 rustup 安装（推荐）

```bash
# macOS/Linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Windows
# 下载并运行 rustup-init.exe：https://rustup.rs/
```

安装完成后，可以使用以下命令验证安装：

```bash
rustc --version
cargo --version
```

#### 更新 Rust

```bash
rustup update
```

#### 安装特定版本或工具链

```bash
# 安装 nightly 版本
rustup install nightly

# 切换默认工具链
rustup default stable  # 或 nightly
```

### Hello World

创建你的第一个 Rust 程序：

1. 创建一个新文件 `hello.rs`：

```rust
fn main() {
    println!("Hello, world!");
}
```

2. 编译并运行：

```bash
rustc hello.rs
./hello  # 在 Windows 上是 hello.exe
```

### Cargo 包管理器

Cargo 是 Rust 的包管理器和构建系统，用于创建、构建和管理 Rust 项目。

#### 创建新项目

```bash
# 创建二进制项目
cargo new hello_cargo
# 创建库项目
cargo new --lib my_library
```

#### 构建项目

```bash
# 构建调试版本
cargo build

# 构建发布版本（优化）
cargo build --release
```

#### 运行项目

```bash
cargo run
```

#### 检查代码

```bash
cargo check
```

#### 项目结构

```
my_project/
├── Cargo.toml      # 项目配置和依赖
├── Cargo.lock      # 锁定依赖版本
└── src/
    └── main.rs     # 源代码
```

#### 添加依赖

编辑 `Cargo.toml` 文件：

```toml
[dependencies]
serde = "1.0"
tokio = { version = "1.0", features = ["full"] }
```

### 基本语法

#### 变量声明

```rust
// 不可变变量（默认）
let x = 5;

// 可变变量
let mut y = 10;
y = 15;  // 可以修改

// 常量
const MAX_POINTS: u32 = 100_000;
```

#### 基本数据类型

```rust
// 整数类型
let i: i32 = -42;  // 有符号 32 位整数
let u: u64 = 100;  // 无符号 64 位整数

// 浮点类型
let f: f64 = 3.14;

// 布尔类型
let b: bool = true;

// 字符类型
let c: char = 'z';

// 字符串类型
let s: &str = "hello";  // 字符串切片
let string: String = String::from("hello");  // 字符串对象
```

#### 复合类型

```rust
// 元组
let tup: (i32, f64, &str) = (500, 6.4, "hello");
let (x, y, z) = tup;  // 解构
let first = tup.0;    // 索引访问

// 数组
let arr: [i32; 5] = [1, 2, 3, 4, 5];
let first = arr[0];   // 索引访问
```

## 基础篇

### 变量与数据类型

#### 变量遮蔽（Shadowing）

```rust
let x = 5;
let x = x + 1;  // 创建新变量，遮蔽旧变量
let x = x * 2;  // 再次遮蔽
println!("x 的值是: {}", x);  // 输出 12
```

#### 数据类型详解

**整数类型**：
- `i8`, `i16`, `i32`, `i64`, `i128`, `isize`（有符号）
- `u8`, `u16`, `u32`, `u64`, `u128`, `usize`（无符号）

**浮点类型**：
- `f32`（单精度）
- `f64`（双精度，默认）

**复合类型**：
- 元组：`(T1, T2, ...)`
- 数组：`[T; N]`（固定长度）
- 切片：`&[T]`（动态长度引用）
- 字符串：`String`（可增长）和 `&str`（字符串切片）

**其他类型**：
- 单元类型：`()`（空元组）
- 永不返回类型：`!`

### 控制流

#### 条件语句

```rust
let number = 6;

if number % 4 == 0 {
    println!("数字可以被 4 整除");
} else if number % 3 == 0 {
    println!("数字可以被 3 整除");
} else {
    println!("数字不能被 4 或 3 整除");
}

// if 作为表达式
let condition = true;
let number = if condition { 5 } else { 6 };
```

#### 循环

```rust
// loop 循环
let mut counter = 0;
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;  // 返回值
    }
};

// while 循环
let mut number = 3;
while number != 0 {
    println!("{}!", number);
    number -= 1;
}

// for 循环
for element in [10, 20, 30].iter() {
    println!("值为: {}", element);
}

// 范围循环
for number in 1..4 {  // 不包含上限
    println!("{}!", number);
}

for number in 1..=3 {  // 包含上限
    println!("{}!", number);
}
```

### 函数与方法

#### 函数定义

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b  // 隐式返回（无分号）
}

fn print_value(value: i32) {
    println!("值为: {}", value);
}

fn main() {
    let sum = add(5, 10);
    print_value(sum);
}
```

#### 方法

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // 构造函数（关联函数）
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
    
    // 方法（带 &self 参数）
    fn area(&self) -> u32 {
        self.width * self.height
    }
    
    // 可变方法
    fn resize(&mut self, width: u32, height: u32) {
        self.width = width;
        self.height = height;
    }
}

fn main() {
    // 使用关联函数
    let mut rect = Rectangle::new(30, 50);
    
    // 调用方法
    println!("面积: {}", rect.area());
    
    // 调用可变方法
    rect.resize(60, 70);
}
```

### 所有权系统

所有权是 Rust 最独特的特性，它使 Rust 能够在不需要垃圾回收的情况下保证内存安全。

#### 所有权规则

1. Rust 中每个值都有一个变量，称为其所有者
2. 一个值同时只能有一个所有者
3. 当所有者离开作用域，值将被丢弃

```rust
{
    let s = String::from("hello");  // s 是字符串的所有者
    // 使用 s
}  // 作用域结束，s 被丢弃，内存被释放
```

#### 移动语义

```rust
let s1 = String::from("hello");
let s2 = s1;  // 所有权从 s1 移动到 s2
// println!("{}", s1);  // 错误：s1 的值已被移动

// 对于基本类型，会进行复制而非移动
let x = 5;
let y = x;  // x 的值被复制给 y
println!("x = {}, y = {}", x, y);  // 正常工作
```

#### 克隆

```rust
let s1 = String::from("hello");
let s2 = s1.clone();  // 深度复制数据
println!("s1 = {}, s2 = {}", s1, s2);  // 正常工作
```

#### 函数与所有权

```rust
fn main() {
    let s = String::from("hello");
    takes_ownership(s);  // s 的所有权移动到函数内
    // println!("{}", s);  // 错误：s 的值已被移动
    
    let x = 5;
    makes_copy(x);  // x 的值被复制
    println!("{}", x);  // 正常工作
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}  // some_string 离开作用域并被丢弃

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
}  // some_integer 离开作用域，无特殊操作
```

### 借用与引用

借用允许我们在不获取所有权的情况下使用值。

#### 不可变引用

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);  // 传递引用
    println!("'{}' 的长度是 {}", s1, len);  // s1 仍然有效
}

fn calculate_length(s: &String) -> usize {  // s 是对 String 的引用
    s.len()
}  // s 离开作用域，但它不拥有引用的值，所以没有任何操作
```

#### 可变引用

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);  // 传递可变引用
    println!("{}", s);  // 输出 "hello, world"
}

fn change(s: &mut String) {
    s.push_str(", world");
}
```

#### 引用规则

1. 在任意给定时间，要么只能有一个可变引用，要么只能有多个不可变引用
2. 引用必须总是有效的

```rust
let mut s = String::from("hello");

// 错误：不能同时拥有可变和不可变引用
let r1 = &s;
let r2 = &s;
let r3 = &mut s;  // 错误
println!("{}, {}, and {}", r1, r2, r3);

// 正确：不可变引用的作用域在最后一次使用后结束
let r1 = &s;
let r2 = &s;
println!("{} and {}", r1, r2);
// r1 和 r2 不再使用

let r3 = &mut s;  // 正确
println!("{}", r3);
```

### 结构体与枚举

#### 结构体

```rust
// 定义结构体
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

// 创建实例
let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};

// 可变实例
let mut user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    active: true,
    sign_in_count: 1,
};
user2.email = String::from("newemail@example.com");

// 字段初始化简写
fn build_user(email: String, username: String) -> User {
    User {
        email,      // 等同于 email: email
        username,   // 等同于 username: username
        active: true,
        sign_in_count: 1,
    }
}

// 结构体更新语法
let user3 = User {
    email: String::from("third@example.com"),
    ..user1  // 其余字段来自 user1
};

// 元组结构体
struct Color(i32, i32, i32);
let black = Color(0, 0, 0);

// 单元结构体
struct AlwaysEqual;
let subject = AlwaysEqual;
```

#### 枚举

```rust
// 基本枚举
enum IpAddrKind {
    V4,
    V6,
}

let four = IpAddrKind::V4;

// 带数据的枚举
enum IpAddr {
    V4(String),
    V6(String),
}

let home = IpAddr::V4(String::from("127.0.0.1"));

// 不同类型数据的枚举
enum Message {
    Quit,                       // 无数据
    Move { x: i32, y: i32 },    // 匿名结构体
    Write(String),              // 包含一个字符串
    ChangeColor(i32, i32, i32), // 包含三个 i32 值
}

// 为枚举实现方法
impl Message {
    fn call(&self) {
        // 方法体
    }
}

let m = Message::Write(String::from("hello"));
m.call();
```

#### Option 枚举

```rust
// Option 是标准库定义的枚举，用于处理可能为空的值
enum Option<T> {
    None,
    Some(T),
}

let some_number = Some(5);
let some_string = Some("a string");
let absent_number: Option<i32> = None;

// 使用 match 处理 Option
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
```

## 高阶篇

### 泛型

泛型允许我们编写适用于多种类型的代码。

#### 泛型函数

```rust
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    
    largest
}

let number_list = vec![34, 50, 25, 100, 65];
let result = largest(&number_list);
println!("最大的数字是 {}", result);

let char_list = vec!['y', 'm', 'a', 'q'];
let result = largest(&char_list);
println!("最大的字符是 {}", result);
```

#### 泛型结构体

```rust
struct Point<T> {
    x: T,
    y: T,
}

let integer = Point { x: 5, y: 10 };
let float = Point { x: 1.0, y: 4.0 };

// 多个泛型参数
struct Point2<T, U> {
    x: T,
    y: U,
}

let both_integer = Point2 { x: 5, y: 10 };
let integer_and_float = Point2 { x: 5, y: 4.0 };
```

#### 泛型方法

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

// 为特定类型实现方法
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
```

### 特质（Trait）

特质定义了类型可以具有的共同行为。

#### 定义特质

```rust
trait Summary {
    fn summarize(&self) -> String;
    
    // 带默认实现的方法
    fn default_summary(&self) -> String {
        String::from("(Read more...)")
    }
}
```

#### 实现特质

```rust
struct NewsArticle {
    headline: String,
    location: String,
    author: String,
    content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

struct Tweet {
    username: String,
    content: String,
    reply: bool,
    retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

#### 特质作为参数

```rust
// 特质约束
fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

// 特质约束的完整形式（特质绑定）
fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

// 多个特质约束
fn notify(item: &(impl Summary + Display)) {
    // ...
}

// 使用 where 子句
fn some_function<T, U>(t: &T, u: &U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{
    // ...
}
```

#### 返回实现特质的类型

```rust
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    }
}
```

### 生命周期

生命周期确保引用在我们使用它们的时候保持有效。

#### 生命周期标注语法

```rust
&i32        // 引用
&'a i32     // 带有显式生命周期的引用
&'a mut i32 // 带有显式生命周期的可变引用
```

#### 函数中的生命周期

```rust
// 错误：缺少生命周期标注
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

// 正确：添加生命周期标注
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

#### 结构体中的生命周期

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().expect("Could not find a '.'");
    let i = ImportantExcerpt {
        part: first_sentence,
    };
}
```

#### 生命周期省略规则

1. 每个引用参数都有自己的生命周期参数
2. 如果只有一个输入生命周期参数，那么它被赋予所有输出生命周期参数
3. 如果有多个输入生命周期参数，但其中一个是 `&self` 或 `&mut self`，那么 `self` 的生命周期被赋予所有输出生命周期参数

#### 静态生命周期

```rust
// 'static 生命周期存活于整个程序期间
let s: &'static str = "I have a static lifetime.";
```

### 错误处理

Rust 将错误分为可恢复错误（`Result<T, E>`）和不可恢复错误（`panic!`）。

#### 使用 panic!

```rust
fn main() {
    panic!("crash and burn");
}

// 设置 RUST_BACKTRACE=1 环境变量可以查看详细的堆栈跟踪
```

#### Result 枚举

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}

// 使用 Result
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");
    
    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => panic!("Problem opening the file: {:?}", other_error),
        },
    };
}
```

#### 简化错误处理

```rust
// 使用 unwrap
let f = File::open("hello.txt").unwrap();  // 成功则返回值，失败则 panic

// 使用 expect（提供自定义 panic 消息）
let f = File::open("hello.txt").expect("Failed to open hello.txt");

// 使用 ?
fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}

// 链式调用
fn read_username_from_file() -> Result<String, io::Error> {
    let mut s = String::new();
    File::open("hello.txt")?.read_to_string(&mut s)?;
    Ok(s)
}
```

### 测试

Rust 内置了单元测试和集成测试支持。

#### 单元测试

```rust
// 在 src/lib.rs 中
pub fn add_two(a: i32) -> i32 {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(4, add_two(2));
    }
    
    #[test]
    fn it_fails() {
        assert_eq!(5, add_two(2));  // 这会失败
    }
    
    #[test]
    #[should_panic(expected = "Guess value must be less than or equal to 100")]
    fn greater_than_100() {
        Guess::new(200);  // 应该 panic
    }
    
    #[test]
    fn it_works_result() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err(String::from("two plus two does not equal four"))
        }
    }
}
```

#### 运行测试

```bash
# 运行所有测试
cargo test

# 运行特定测试
cargo test it_works

# 运行包含特定字符串的测试
cargo test works

# 忽略特定测试
#[test]
#[ignore]
fn expensive_test() {
    // ...
}

# 运行被忽略的测试
cargo test -- --ignored
```

#### 集成测试

在项目根目录创建 `tests` 目录：

```rust
// tests/integration_test.rs
use adder;  // 你的库名

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}
```

### 并发编程

Rust 的所有权和类型系统为并发编程提供了强大的安全保障。

#### 线程

```rust
use std::thread;
use std::time::Duration;

fn main() {
    // 创建线程
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });
    
    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
    
    // 等待线程完成
    handle.join().unwrap();
}
```

#### 使用 move 闭包

```rust
let v = vec![1, 2, 3];

let handle = thread::spawn(move || {
    println!("Here's a vector: {:?}", v);
});

handle.join().unwrap();
```

#### 消息传递

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    // 创建通道
    let (tx, rx) = mpsc::channel();
    
    // 创建发送线程
    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });
    
    // 接收消息
    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
```

#### 多个生产者

```rust
let (tx, rx) = mpsc::channel();

let tx1 = tx.clone();
thread::spawn(move || {
    let vals = vec![
        String::from("hi"),
        String::from("from"),
        String::from("the"),
        String::from("thread"),
    ];

    for val in vals {
        tx1.send(val).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});

thread::spawn(move || {
    let vals = vec![
        String::from("more"),
        String::from("messages"),
        String::from("for"),
        String::from("you"),
    ];

    for val in vals {
        tx.send(val).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});

for received in rx {
    println!("Got: {}", received);
}
```

#### 共享状态

```rust
use std::sync::{Mutex, Arc};
use std::thread;

fn main() {
    // Arc<T> 是线程安全的引用计数指针
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```

## 大师篇

### 高级特质

#### 关联类型

```rust
trait Iterator {
    type Item;  // 关联类型
    
    fn next(&mut self) -> Option<Self::Item>;
}

impl Iterator for Counter {
    type Item = u32;
    
    fn next(&mut self) -> Option<Self::Item> {
        // 实现迭代器逻辑
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}
```

#### 默认类型参数

```rust
trait Add<RHS=Self> {  // RHS 默认为 Self
    type Output;
    
    fn add(self, rhs: RHS) -> Self::Output;
}

// 实现 Add 特质
impl Add for Point {
    type Output = Point;
    
    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

// 为不同类型实现 Add
impl Add<Meters> for Millimeters {
    type Output = Millimeters;
    
    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}
```

#### 完全限定语法

```rust
trait Pilot {
    fn fly(&self);
}

trait Wizard {
    fn fly(&self);
}

struct Human;

impl Pilot for Human {
    fn fly(&self) {
        println!("This is your captain speaking.");
    }
}

impl Wizard for Human {
    fn fly(&self) {
        println!("Up!");
    }
}

impl Human {
    fn fly(&self) {
        println!("*waving arms furiously*");
    }
}

fn main() {
    let person = Human;
    
    person.fly();           // 调用 Human 的方法
    Pilot::fly(&person);    // 调用 Pilot 特质的方法
    Wizard::fly(&person);   // 调用 Wizard 特质的方法
    
    // 对于关联函数（没有 &self 参数）
    <Human as Pilot>::fly();
}
```

#### 特质继承

```rust
trait Animal {
    fn name(&self) -> String;
}

trait Mammal: Animal {  // Mammal 继承 Animal
    fn make_sound(&self) -> String;
}

struct Dog {
    name: String,
}

impl Animal for Dog {
    fn name(&self) -> String {
        self.name.clone()
    }
}

impl Mammal for Dog {
    fn make_sound(&self) -> String {
        format!("{} says: Woof!", self.name())
    }
}
```

### 宏编程

宏是 Rust 中的元编程工具，允许你编写生成其他代码的代码。

#### 声明宏

```rust
// 简单的宏
macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
}

// 带参数的宏
macro_rules! vec_of_strings {
    ($($x:expr),*) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x.to_string());
            )*
            temp_vec
        }
    };
}

fn main() {
    say_hello!();  // 输出 "Hello!"
    
    let v = vec_of_strings!["hello", "world"];
    println!("{:?}", v);  // 输出 ["hello", "world"]
}
```

#### 过程宏

过程宏允许你操作 Rust 的语法树。

```rust
// 在 Cargo.toml 中添加
// [lib]
// proc-macro = true
//
// [dependencies]
// syn = "1.0"
// quote = "1.0"
// proc-macro2 = "1.0"

use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

// 派生宏
#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    // 解析 Rust 代码
    let input = parse_macro_input!(input as DeriveInput);
    let name = input.ident;
    
    // 构建输出
    let expanded = quote! {
        impl HelloMacro for #name {
            fn hello_macro() {
                println!("Hello, Macro! My name is {}", stringify!(#name));
            }
        }
    };
    
    // 转换回 TokenStream
    expanded.into()
}

// 属性宏
#[proc_macro_attribute]
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {
    // 实现...
}

// 函数式宏
#[proc_macro]
pub fn sql(input: TokenStream) -> TokenStream {
    // 实现...
}
```

### unsafe Rust

unsafe Rust 允许你执行一些编译器无法保证安全的操作。

#### unsafe 操作

```rust
unsafe fn dangerous() {
    // 危险操作...
}

fn main() {
    // 调用 unsafe 函数
    unsafe {
        dangerous();
    }
    
    // 解引用裸指针
    let mut num = 5;
    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;
    
    unsafe {
        println!("r1 is: {}", *r1);
        *r2 = 10;
        println!("r2 is: {}", *r2);
    }
    
    // 访问或修改可变静态变量
    static mut COUNTER: u32 = 0;
    
    unsafe {
        COUNTER += 1;
        println!("COUNTER: {}", COUNTER);
    }
    
    // 实现 unsafe 特质
    unsafe trait Foo {
        // 方法...
    }
    
    unsafe impl Foo for i32 {
        // 实现...
    }
}
```

#### 裸指针

```rust
let address = 0x012345usize;
let r = address as *const i32;

// 创建裸指针
let mut num = 5;
let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;

// 使用裸指针
unsafe {
    println!("r1 is: {}", *r1);
    *r2 = 10;
    println!("r2 is: {}", *r2);
}
```

### FFI 与外部代码交互

FFI（Foreign Function Interface）允许 Rust 代码与其他语言编写的代码交互。

#### 调用 C 函数

```rust
// 在 Cargo.toml 中添加
// [dependencies]
// libc = "0.2"

use std::ffi::CString;
use std::os::raw::c_char;

extern "C" {
    fn printf(format: *const c_char, ...) -> i32;
}

fn main() {
    let message = CString::new("Hello from Rust!\n").unwrap();
    unsafe {
        printf(message.as_ptr());
    }
}
```

#### 导出 Rust 函数给 C 调用

```rust
#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

#### 使用 bindgen 自动生成绑定

```bash
# 安装 bindgen
cargo install bindgen

# 生成绑定
bindgen wrapper.h -o src/bindings.rs
```

### 性能优化

#### 编译优化

```bash
# 发布模式构建（默认优化）
cargo build --release

# 在 Cargo.toml 中自定义优化级别
[profile.release]
opt-level = 3  # 最高优化级别
lto = true     # 链接时优化
codegen-units = 1  # 减少并行代码生成单元，提高优化
```

#### 内存优化

```rust
// 使用 Box<T> 将大型数据存储在堆上
struct LargeStruct {
    data: [u8; 1000000],
}

fn process_data() {
    // 直接在栈上分配可能导致栈溢出
    // let large = LargeStruct { data: [0; 1000000] };
    
    // 在堆上分配
    let large = Box::new(LargeStruct { data: [0; 1000000] });
    // 使用 large...
}

// 使用 Cow 避免不必要的克隆
use std::borrow::Cow;

fn process_string(input: &str) -> Cow<str> {
    if input.contains("foo") {
        // 只在需要修改时分配新内存
        Cow::Owned(input.replace("foo", "bar"))
    } else {
        // 否则使用引用
        Cow::Borrowed(input)
    }
}
```

#### 算法优化

```rust
// 使用更高效的数据结构
use std::collections::{HashMap, BTreeMap};

// 哈希表：平均 O(1) 查找
let mut map = HashMap::new();
map.insert("key", "value");

// B 树：有序键，范围查询更高效
let mut btree = BTreeMap::new();
btree.insert("key", "value");

// 避免不必要的分配
fn process_vec(data: &[i32]) -> Vec<i32> {
    let mut result = Vec::with_capacity(data.len());  // 预分配容量
    for &item in data {
        if item > 0 {
            result.push(item * 2);
        }
    }
    result
}
```

#### 并行计算

```rust
// 在 Cargo.toml 中添加
// [dependencies]
// rayon = "1.5"

use rayon::prelude::*;

fn sum_of_squares(input: &[i32]) -> i32 {
    input.par_iter()  // 并行迭代
         .map(|&i| i * i)
         .sum()
}

fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let sum = sum_of_squares(&numbers);
    println!("Sum of squares: {}", sum);
}
```

### 设计模式

#### 构建者模式

```rust
#[derive(Default)]
struct Pizza {
    cheese: bool,
    pepperoni: bool,
    mushrooms: bool,
    bacon: bool,
    extra_sauce: bool,
}

struct PizzaBuilder {
    pizza: Pizza,
}

impl PizzaBuilder {
    fn new() -> PizzaBuilder {
        PizzaBuilder {
            pizza: Pizza::default(),
        }
    }
    
    fn cheese(mut self, value: bool) -> PizzaBuilder {
        self.pizza.cheese = value;
        self
    }
    
    fn pepperoni(mut self, value: bool) -> PizzaBuilder {
        self.pizza.pepperoni = value;
        self
    }
    
    fn mushrooms(mut self, value: bool) -> PizzaBuilder {
        self.pizza.mushrooms = value;
        self
    }
    
    fn bacon(mut self, value: bool) -> PizzaBuilder {
        self.pizza.bacon = value;
        self
    }
    
    fn extra_sauce(mut self, value: bool) -> PizzaBuilder {
        self.pizza.extra_sauce = value;
        self
    }
    
    fn build(self) -> Pizza {
        self.pizza
    }
}

fn main() {
    let pizza = PizzaBuilder::new()
        .cheese(true)
        .pepperoni(true)
        .mushrooms(false)
        .bacon(true)
        .extra_sauce(true)
        .build();
}
```

#### 观察者模式

```rust
trait Observer {
    fn update(&self, message: &str);
}

struct Subject {
    observers: Vec<Box<dyn Observer>>,
}

impl Subject {
    fn new() -> Subject {
        Subject {
            observers: Vec::new(),
        }
    }
    
    fn attach(&mut self, observer: Box<dyn Observer>) {
        self.observers.push(observer);
    }
    
    fn notify(&self, message: &str) {
        for observer in &self.observers {
            observer.update(message);
        }
    }
}

struct ConcreteObserver {
    name: String,
}

impl ConcreteObserver {
    fn new(name: String) -> ConcreteObserver {
        ConcreteObserver { name }
    }
}

impl Observer for ConcreteObserver {
    fn update(&self, message: &str) {
        println!("{} received message: {}", self.name, message);
    }
}

fn main() {
    let mut subject = Subject::new();
    
    subject.attach(Box::new(ConcreteObserver::new("Observer 1".to_string())));
    subject.attach(Box::new(ConcreteObserver::new("Observer 2".to_string())));
    
    subject.notify("Hello, observers!");
}
```

#### 策略模式

```rust
trait PaymentStrategy {
    fn pay(&self, amount: f64) -> bool;
}

struct CreditCardPayment {
    name: String,
    card_number: String,
    cvv: String,
    expiry_date: String,
}

impl PaymentStrategy for CreditCardPayment {
    fn pay(&self, amount: f64) -> bool {
        println!("Paid ${} with credit card", amount);
        true  // 假设支付成功
    }
}

struct PayPalPayment {
    email: String,
    password: String,
}

impl PaymentStrategy for PayPalPayment {
    fn pay(&self, amount: f64) -> bool {
        println!("Paid ${} with PayPal", amount);
        true  // 假设支付成功
    }
}

struct ShoppingCart {
    payment_method: Box<dyn PaymentStrategy>,
    items: Vec<(String, f64)>,
}

impl ShoppingCart {
    fn new(payment_method: Box<dyn PaymentStrategy>) -> ShoppingCart {
        ShoppingCart {
            payment_method,
            items: Vec::new(),
        }
    }
    
    fn add_item(&mut self, name: String, price: f64) {
        self.items.push((name, price));
    }
    
    fn calculate_total(&self) -> f64 {
        self.items.iter().map(|(_, price)| price).sum()
    }
    
    fn checkout(&self) -> bool {
        let amount = self.calculate_total();
        self.payment_method.pay(amount)
    }
}

fn main() {
    // 使用信用卡支付
    let credit_card = CreditCardPayment {
        name: "John Doe".to_string(),
        card_number: "1234 5678 9012 3456".to_string(),
        cvv: "123".to_string(),
        expiry_date: "12/25".to_string(),
    };
    
    let mut cart = ShoppingCart::new(Box::new(credit_card));
    cart.add_item("Book".to_string(), 15.99);
    cart.add_item("Headphones".to_string(), 59.99);
    cart.checkout();
    
    // 使用 PayPal 支付
    let paypal = PayPalPayment {
        email: "john.doe@example.com".to_string(),
        password: "password123".to_string(),
    };
    
    let mut cart = ShoppingCart::new(Box::new(paypal));
    cart.add_item("Laptop".to_string(), 999.99);
    cart.checkout();
}
```

## 结语

Rust 是一门强大而安全的系统编程语言，它的所有权系统、类型系统和零成本抽象使其成为开发高性能、高可靠性软件的理想选择。通过本教程，你已经从入门级了解到了 Rust 的大师级特性，包括基本语法、所有权系统、高级特质、宏编程、unsafe Rust、FFI、性能优化和设计模式等。

继续深入学习和实践是掌握 Rust 的关键。尝试构建实际项目，参与开源社区，并保持对 Rust 生态系统的关注，将帮助你成为一名熟练的 Rust 开发者。

## 参考资源

- [Rust 官方文档](https://doc.rust-lang.org/)
- [Rust 程序设计语言（中文版）](https://kaisery.github.io/trpl-zh-cn/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rust 标准库文档](https://doc.rust-lang.org/std/)
- [Rust Cookbook](https://rust-lang-nursery.github.io/rust-cookbook/)
- [Rust 设计模式](https://rust-unofficial.github.io/patterns/)

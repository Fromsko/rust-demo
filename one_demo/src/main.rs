mod test_type_system;
mod variables;
mod non_rust;

pub struct User {
    pub name: String,  // name 是 String 类型
}

impl User {
    pub fn new(name: String) -> User {
        // 如果只有一条 | 最后一条是需要的结果 也会被返回 则会默认被返回出去
        let user = name;
        User { name: user }
    }
}

fn main() {
    println!("Hello, world!");
    // hello();

    let user1 = User::new("Alice".to_owned());
    // let user_next = User::new(String::from("Boli")); // 另一种使用方法

    let user2 = user1;
    print_name(user2); // 值的位置被改动，导致无法访问

    let user = crate::test_type_system::User::new(
      "Tome".to_owned()
    );

    let _ = user.get_user_profile();
}

fn print_name(user: User) {
    println!("{}", user.name)
}

// 显示忽略: 函数未被使用
fn _hello() {
    println!("Hello, world!");

    // 循环
    for i in 0..10 {
        println!("{}", i);
    }
}
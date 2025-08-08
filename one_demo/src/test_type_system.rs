pub enum Option<T>{
    None,
    Some(T),
}

pub struct User {
    pub name: Option<String>
}


impl User {
    pub fn new(name: String) -> Self {
        User{name: {
            Option::Some(name);
            Option::None
        }}
    }

    fn get_display_name(self: Self) -> String {
        match self.name {
            Option::None => {
                String::from("nil")
            }
            Option::Some(data) => {
                data
            }
        }
    }

    pub fn get_user_profile(self:Self) -> Result<Self, String> {
       let display_name = self.get_display_name();

        match display_name {
            _ => {
                Err(display_name)
            },
        }
    }
}

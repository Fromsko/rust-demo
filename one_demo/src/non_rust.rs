#![allow(unused_variables)]
#![allow(dead_code)]
const STARTING_MISSILES:i32 = 8;
const READY_AMOUNT:i32 = 2;

fn main() {
    let mut missiles:i32 = STARTING_MISSILES;
    let ready:i32 =  READY_AMOUNT;
    println!("Missiles: {} ready: {}",missiles, ready);

    missiles = missiles - ready;
    println!("Missiles: {}",missiles);
}

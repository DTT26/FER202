const result = (a, b) => a + b;
console.log(result(1, 2));

let square = (num) => num * num;
console.log(square(5));

let sayHello = () => console.log("Hello!");
sayHello();

let person = {
  name: "Thanh Tung",
  age: 21,
  greet: function () {
    console.log(
      `Hello, my name is ${this.name} and i'm ${this.age} years old.`
    );
  },
};
person.greet();

let greet = (name, timeofDay) => {
  console.log(`Good ${timeofDay}, ${name}!`);
}
greet("Alice", "morning");
greet("Bob", "evening");
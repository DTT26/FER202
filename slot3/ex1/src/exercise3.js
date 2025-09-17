// Destructuring lấy street, city với giá trị mặc định
const person = {
    name: "Costas",
    address: {
        street: "Lalaland 12"
    }
};

const { address: { street, city = "Unknown City" } } = person;
console.log(street); // Lalaland 12
console.log(city);   // Unknown City

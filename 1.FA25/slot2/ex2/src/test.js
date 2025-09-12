// Tạo mảng số nguyên gồm 26 số
const arr = Array.from({ length: 26 }, (_, i) => i + 1);

// Duyệt qua mảng bằng for
console.log('Duyệt bằng for:');
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// Duyệt qua mảng bằng forEach
console.log('Duyệt bằng forEach:');
arr.forEach(num => console.log(num));

// Duyệt qua mảng bằng map
console.log('Duyệt bằng map:');
arr.map(num => console.log(num));

// Lọc ra các phần tử chẵn bằng filter
const evenNumbers = arr.filter(num => num % 2 === 0);
console.log('Các số chẵn:', evenNumbers);

// Tạo mảng people gồm các person với id, name, age
const people = [
    { id: 1, name: 'Alice', age: 22 },
    { id: 2, name: 'Bob', age: 19 },
    { id: 3, name: 'Charlie', age: 25 },
    { id: 4, name: 'David', age: 18 },
    { id: 5, name: 'Eve', age: 30 }
];

// Duyệt qua mảng in ra id, name, age
console.log('Danh sách people:');
people.forEach(person => {
    console.log(`id: ${person.id}, name: ${person.name}, age: ${person.age}`);
});

// Lọc ra những người có age > 20
const over20 = people.filter(person => person.age > 20);
console.log('Danh sách age > 20:');
over20.forEach(person => {
    console.log(`id: ${person.id}, name: ${person.name}, age: ${person.age}`);
});
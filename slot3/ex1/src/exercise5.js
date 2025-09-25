const people = [
	{ name: 'Ann', age: 19 },
	{ name: 'Bob', age: 12 },
	{ name: 'Cindy', age: 15 },
	{ name: 'David', age: 22 },
	{ name: 'Eva', age: 13 }
];

const teens = people
	.filter(p => p.age >= 13 && p.age <= 19)
	.map(p => `${p.name} co ${p.age} tuoi`);

teens.forEach(str => console.log(str));

const sortedTeens = [...teens].sort((a, b) => a.localeCompare(b));
console.log(sortedTeens);

const firstTwo = sortedTeens.slice(0, 2);
console.log(firstTwo);
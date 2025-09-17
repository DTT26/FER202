// sum: tổng các số hợp lệ
const sum = (...nums) => nums.filter(Number.isFinite).reduce((a, b) => a + b, 0);

// avg: trung bình 2 chữ số, rỗng trả 0
const avg = (...nums) => {
	const valid = nums.filter(Number.isFinite);
	return valid.length ? +(sum(...valid) / valid.length).toFixed(2) : 0;
};

console.log(sum(1,2,3));           // 6
console.log(sum(1,'x',4));         // 5
console.log(avg(1,2,3,4));         // 2.5
console.log(avg());                // 0


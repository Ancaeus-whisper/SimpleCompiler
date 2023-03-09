const compiler=require('./compiler');
const input='(add 2(sub 4 (add 1 (sub 6 (mul 2 2)))))';
const output=compiler(input);
console.log(output);
function add(a,b){return a+b;}
function sub(a,b){return a-b;}
function mul(a,b){return a*b;}
function div(a,b){return a/b;}
console.log(eval(output));
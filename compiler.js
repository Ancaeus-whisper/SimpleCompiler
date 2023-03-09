const tokenizer=require('./tokenizer');//获取词向量
const parser=require('./parser');//获取语法树
const transformer=require('./transformer');//获取js语法树的转换器
const generateCode=require('./generateCode');
const LETTERS=/[a-z]/i;
const WHITESPACE=/\s/;
const NUMBER=/\d/;
//功能：将输入的语句转换成可执行的代码
//契约：输入：语句（字符串），输出：执行结果（字符串）
module.exports=function exports(input)
{
    //1.词法分析
    const tokens=tokenizer(input);
    let current=0;
    while(current<input.length)
    {
        //词法解析器
        let char=input[current];
        if(char=='('||char==')')
        {
            tokens.push({type:'paren',value:char});
            current++;
            continue;
        }
        if(LETTERS.test(char))
        {
            let value='';
            while(LETTERS.test(char))
            {
                value+=char;
                char=input[++current];
            }
            tokens.push({type:'name',value});
            continue;
        }
        if(WHITESPACE.test(char))
        {
            current++;
            continue;
        }
        if(NUMBER.test(char))
        {
            let value='';
            while(NUMBER.test(char))
            {
                value+=char;
                char=input[++current];
            }
            tokens.push({type:'number',value});
            continue;
        }
        
        //抛出未知符号
        throw new TypeError(`Unknown char: '${char}'`);
    }
    //2.语法分析
    //这部分的功能是将上个阶段生成的词向量转化成语法树
    const lispAST=parser(tokens);
    //3.转换
    //这部分的功能是将Lisp形式的语法树转化为JS形式的语法树
    const jsAST=transformer(lispAST);
    console.log(JSON.stringify(jsAST, null, 2));
    //4.代码生成
    //这部分的功能是将js形式的语法树编译生成真正的js语句并执行
    const jsCode=generateCode(jsAST);
    return jsCode;
}
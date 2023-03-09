//功能：将读取的词法栈转换为语法树
//契约：输入：词法栈（json），输出：语法树（json）
module.exports=function parser(tokens)
{
    let current=0;
    function walk()
    {
        //获取下一个词语
        let token=tokens[current];
        if(token.type==='number')
        {
            current++;
            return{
                type:'NumberLiteral',
                value: token.value
            };
        }
        if(token.type==='paren'&&token.value==='(')
        {
            token=tokens[++current];
            const expression=
            {
                type:'CallExpression',
                name:token.value,
                params:[]
            };
            token=tokens[++current];
            while(token.value!=')')
            {
                //直到读取到这个函数的结束，将读到的参数压入栈中
                expression.params.push(walk());
                token=tokens[current];
            }
            current++;
            return expression;
        }
        //抛出未定义词语类型
        throw new TypeError(`Unknown token:${token.type}`);
    }
    const ast=
    {
        type:'Program',
        body:[walk()]
    };
    return ast;
}
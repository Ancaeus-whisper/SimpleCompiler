const traverse=require('./traverse');
//功能：将读入的lisp形式语法树转换为任意形式语法树
//契约：输入：语法树（json），输出：语法树（json）
module.exports=function transformer(originalAST)
{
    const jsAST=
    {
        type:'Program',
        body:[]
    };

    let position=jsAST.body;
    traverse(originalAST,
        {
            NumberLiteral(node)
            {
                position.push({type:'NumericLiteral',value:node.value});
            },
            CallExpression(node,parents)
            {
                let expression=
                {
                    type:'CallExpression',
                    callee:
                    {
                        type:'Identifier',
                        name:node.name
                    },
                    arguments:[]
                }
                const prevPosition=position;
                position=expression.arguments;
                if(parents.type!=='CallExpression')
                {
                    expression=
                    {
                        type:'ExpressionStatement',
                        expression
                    }
                }
                prevPosition.push(expression);
            }
        });
    return jsAST;
}
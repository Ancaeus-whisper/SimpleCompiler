//功能：通过传来的语法树与方法列表，将语法树按需求转换
//契约：输入：语法树（树形式的json），功能列表（由函数组成的json）
//      输出：无
module.exports=function traverse(ast,visitors)
{
    //功能：执行单个节点的指令
    //契约：输入：节点，节点的父节点，输出：无
    function walkNode(node,parent)
    {
        const method=visitors[node.type];
        if(method)//是方法就执行
        {
            method(node,parent);
        }
        if(node.type==="Program")
        {
            walkNodes(node.body,node);
        }else if(node.type==="CallExpression")
        {
            walkNodes(node.params,node);
        }
        
    }
    //功能：遍历多个节点，逐个执行其中的指令
    //契约：输入：节点组，节点的父节点，输出：无
    function walkNodes(nodes,parent)
    {
        nodes.forEach(node => walkNode(node,parent));
    }
    //从根节点开始遍历
    walkNode(ast,null);
}
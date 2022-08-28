// 函数同样也可以做类型匹配，比如提取参数、返回值的类型。

type GetParameters<Func extends Function> =
    Func extends (...args: infer Args) => unknown ? Args : never;

type ParametersResult = GetParameters<(name: string, age: number) => string>
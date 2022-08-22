// 数组类型反转
type ReverseArr<Arr extends unknown[]> =
    Arr extends [infer First, ...infer Rest]
    ? [...ReverseArr<Rest>, First]
    : Arr;

    
type ReverseArrResult = ReverseArr<[1, 2, 3, 4, 5]>
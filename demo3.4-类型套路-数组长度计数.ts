// 数组长度计数实现加法

type BuildArray<
    Length extends number,
    Ele = unknown,
    Arr extends unknown[] = []
    > = Arr['length'] extends Length
    ? Arr
    : BuildArray<Length, Ele, [...Arr, Ele]>;

type Add<Num1 extends number, Num2 extends number> =
    [...BuildArray<Num1>, ...BuildArray<Num2>]['length'];

    
type AddResult = Add<32, 25>

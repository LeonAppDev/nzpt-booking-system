export class OrderDetail
{
    public email: string = '';
    public name: string = '';
    public phone: string = '';
    public adults: number = 0;
    public children: number = 0;
    public family: number = 0;
    public alone: string = '';
    public notPool: string = '';
    public notes: string = '';
    public session: any = '';
    [key:string]:any
}

export interface OrderDetailList {
    date:any;
    timeSession: rangeTime;
    totalAdults: number;
    totalChildren: number;
    orderDetails:OrderDetail[];
}

export enum rangeTime {
    morning,
    afternoon
}

export type ClientProps = {
   firstName: string;
   lastName: string;

   street: string;
   block: string;
   batch: string;
   complement: string;
   addressId?: number;

   nameDistrict: string;
   districtId?: number;
}

export type Address = {
   street: string;
   block: string;
   batch: string;
   complement?: string;
}

// export type district = {
//    nameDistrict: string;
// }
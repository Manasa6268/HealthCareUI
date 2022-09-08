export interface MemberDetails {
    Id: number;
    Code: string;
    FirstName: string;
    LastName: string;
    UserName: string;
    Password: string;
    confirmpassword: string;
    UserType: string;
    DOB: Date;
    Address: string;
    City: string;
    State: string;
    Email: string;
    PhysicianName: string;
    CreatedDate: Date;
    ModifiedDate: Date;
    ModifiedBy: string;
}
export interface UserCredentials {
    userName: string;
    password: string;
}
export interface States {
    id: string;
    state: string;
}
export interface UserTypes {
    id: string;
    userType: string;
}
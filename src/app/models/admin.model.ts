export interface MemberDetails {
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    confirmpassword: string;
    userType: string;
    dob: Date;
    address: string;
    city: string;
    state: string;
    email: string;
    physicianName: string;
    createdDate: Date;
    modifiedDate: Date;
    modifiedBy: string;

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
export interface PhysicianDetails {
    id: string;
    physicianName: string;
    physicianState: string;
}
export interface PhysicianAssign {
    memberId: string;
    physicianName: string | null;
    adminId: string | null;
}
export interface MemberList {

    memberId: string;
    firstName: string;
    lastName: string;
    physicianName: string;
    claimId: string;
    claimAmount: number;
    claimDate: Date;
    hasclaim: boolean;
    hasphysician: boolean;
}
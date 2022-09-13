export interface ClaimDetails {

    id: number,
    code: string,
    memberId: string | null,
    claimType: string,
    claimAmount: number,
    claimDate: Date,
    remarks: string,
    createdBy: string | null;



}
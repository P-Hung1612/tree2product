//object chứa dữ liệu để tạo HarvestBatch mới
export interface CreateHarvestBatchDTO {
    workerId: string;
    shiftId: string;
    latexType: string;
    tappingAreaId?: string;
}

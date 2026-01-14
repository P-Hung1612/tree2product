import { z } from 'zod';

// 1. Định nghĩa Schema (Luật lệ)
// Lưu ý: Các giá trị Enum này phải khớp với Business Rule (và khớp với DB)
export const CreateHarvestBatchSchema = z.object({
    // Zod sẽ chặn ngay nếu string không nằm trong list này
    latexType: z.enum(['NUOC', 'DONG', 'DAY', 'CHEN'], {
       error: 'Invalid latex type provided',
    }),
    workerId: z.string(),
    shiftId: z.string(),
    tappingAreaId: z.string().nullable(),
});

// 2. Export Type tự động từ Schema (Không cần viết interface tay nữa!)
export type CreateHarvestBatchDTO = z.infer<typeof CreateHarvestBatchSchema>;

//object chứa dữ liệu để tạo HarvestBatch mới (thủ công với interface)
// export interface CreateHarvestBatchDTO {
//     workerId: string;
//     shiftId: string;
//     latexType: string;
//     tappingAreaId?: string;
// }

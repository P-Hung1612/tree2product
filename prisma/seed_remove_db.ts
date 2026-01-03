import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Đang bắt đầu quá trình Seed loại bỏ dữ liệu...' )
    // --- SEED REMOVE DATA IF NEEDED HERE ---
    // const removedWorker = await prisma.worker.deleteMany({
    //     where: { employeeCode: 'NV_CAN_001' },
    // });
    // console.log('✅ Đã loại bỏ Worker', removedWorker);
    // const removedShift = await prisma.shift.deleteMany({
    //     where: { shiftCode: 'CA_CHIEU_01' },
    // });
    // console.log('✅ Đã loại bỏ Shift', removedShift);
    const removedHarvestBatch = await prisma.harvestBatch.deleteMany({
        where: {
            workerId: '6af5650e-9fc7-46b9-bd96-d57a042e962f',
            shiftId: '1d91fd19-cf28-4e79-ab1e-47b734e7a6bb',
            latexType: 'NUOC',
        },
    });
    console.log('✅ Đã loại bỏ HarvestBatch', removedHarvestBatch);
    
    console.log('✅ Quá trình Seed loại bỏ dữ liệu hoàn tất!');
}
;

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Lỗi khi seed dữ liệu loại bỏ:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
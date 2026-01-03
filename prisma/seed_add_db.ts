import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Đang bắt đầu quá trình Seed bổ sung dữ liệu...')
    // --- SEED ADDITIONAL DATA IF NEEDED HERE ---
    // const additionalWorker = await prisma.worker.upsert({
    //     where: { employeeCode: 'NV_CAN_001' },
    //     update: {},
    //     create: {
    //         name: 'Lê Hai',
    //         employeeCode: 'NV_CAN_001',
    //         role: 'Công nhân cân',
    //     },
    // });
    // console.log('✅ Đã tạo thêm Worker bổ sung', additionalWorker);
    // const additionalShift = await prisma.shift.create({
    //     data: {
    //         workDate: new Date(),
    //         shiftCode: 'CA_CHIEU_01',
    //     },
    // });
    // console.log('✅ Đã tạo thêm Shift bổ sung',additionalShift);
    const additionalHarvestBatch = await prisma.harvestBatch.create({
        data: {
            workerId: '6af5650e-9fc7-46b9-bd96-d57a042e962f',
            shiftId: '1d91fd19-cf28-4e79-ab1e-47b734e7a6bb',
            latexType: 'NUOC',
            tappingAreaId: '12345678-90ab-cdef-1234-567890abcdef',
        },
    });
    console.log('✅ Đã tạo thêm HarvestBatch bổ sung', additionalHarvestBatch);

    console.log('✅ Quá trình Seed bổ sung dữ liệu hoàn tất!');
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Lỗi khi seed dữ liệu bổ sung:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
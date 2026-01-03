import { PrismaClient, LatexType, BatchStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Đang bắt đầu quá trình Seed dữ liệu...');

    // --- 1. SEED WORKER (Dùng upsert để tránh trùng lặp employeeCode) ---
    const worker = await prisma.worker.upsert({
        where: { employeeCode: 'NV_CAO_001' },
        update: {},
        create: {
            name: 'Nguyễn Văn A',
            employeeCode: 'NV_CAO_001',
            role: 'Công nhân khai thác',
        },
    });

    console.log('✅ Đã tạo Worker mẫu');

    // --- 2. SEED SHIFT ---
    const shift_sang = await prisma.shift.create({
        data: {
            workDate: new Date(),
            shiftCode: 'CA_SANG_01',
        },
    });
    console.log('✅ Đã tạo Shift mẫu');

    // --- 3. SEED HARVEST BATCH (Kết nối với Worker và Shift vừa tạo) ---
    const harvestBatch = await prisma.harvestBatch.create({
        data: {
            workerId: worker.workerId,
            shiftId: shift_sang.shiftId,
            latexType: LatexType.NUOC,
            tappingAreaId: null, // Có thể bổ sung UUID nếu có bảng Area
            status: BatchStatus.CREATED,
        },
    });
    
    console.log('✅ Đã tạo HarvestBatch mẫu');

    // --- 4. SEED VEHICLE ---
    const vehicle = await prisma.vehicle.upsert({
        where: { plateNumber: '93H1-12345' },
        update: {},
        create: {
            plateNumber: '93H1-12345',
            capacity: 5000.0, // 5 tấn
        },
    });
    console.log('✅ Đã tạo Vehicle mẫu');

    // --- 5. SEED EQUIPMENT (Tank, Yard, Furnace) ---

    // Fermentation Tank (Bể đánh đông)
    const fermentationTank = await prisma.fermentationTank.upsert({
        where: { tankCode: 'BE_DONG_A1' },
        update: {},
        create: {
            tankCode: 'BE_DONG_A1',
            capacity: 1000.0,
        },
    });

    // Tank (Hồ chứa phụ/Hồ sơ chế)
    const tank = await prisma.tank.upsert({
        where: { tankCode: 'HO_PHU_01' },
        update: {},
        create: {
            tankCode: 'HO_PHU_01',
            type: 'PHU',
        },
    });

    // Yard (Sân phơi)
    const yard = await prisma.yard.upsert({
        where: { yardCode: 'SAN_PHOI_01' },
        update: {},
        create: {
            yardCode: 'SAN_PHOI_01',
            location: 'Khu vực xưởng 1',
        },
    });

    // Furnace (Lò sấy)
    const furnace = await prisma.furnace.create({
        data: {
            furnaceCode: 'LO_SAY_01',
        },
    });
    console.log('✅ Đã tạo Equipment mẫu (Tank/Yard/Furnace)');

    console.log('\n✨ Chúc mừng! Dữ liệu mẫu đã sẵn sàng trong Database.');


    console.log('✅ Đã tạo dữ liệu mẫu thành công:');
    console.table({
        Worker: worker.name,
        BatchID: harvestBatch.batchId,
        Vehicle: vehicle.plateNumber,
        Tank: tank.tankCode,
        Yard: yard.yardCode,
        Furnace: furnace.furnaceCode,
        FermentationTank: fermentationTank.tankCode,
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Lỗi khi seed dữ liệu:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
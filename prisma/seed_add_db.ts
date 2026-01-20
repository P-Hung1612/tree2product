import { LatexType, PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Đang bắt đầu quá trình Seed bổ sung dữ liệu...')
    const allWorkers = await prisma.worker.findMany({
        where: { role: 'CONG_NHAN_CAO' },
        select: { workerId: true },
    });
    const allShifts = await prisma.shift.findMany({
        where: { shiftCode: { in: ['DOT-1', 'DOT-2'] } },//chọn nhiều ca để tạo dữ liệu đa dạng hơn
        select: { shiftId: true },
    });
    const latexType = Object.values(LatexType); // Lấy tất cả các giá trị của enum LatexType

    if (allWorkers.length === 0 || allShifts.length === 0) {
        throw new Error('Thiếu cơ sở dữ liệu. Vui lòng chạy seed ban đầu trước.');
        return;
    }
    // Tạo HarvestBatch mẫu
    const batchData = [];
    for (let i = 0; i <= 0; i++) {
        const randomWorker = faker.helpers.arrayElement(allWorkers);
        const randomShift = faker.helpers.arrayElement(allShifts);
        const randomLatexType = faker.helpers.arrayElement(latexType);
        batchData.push({
            workerId: randomWorker.workerId,
            shiftId: randomShift.shiftId,
            latexType: randomLatexType,
            tappingAreaId: faker.string.uuid()//1 chuỗi uuid bất kì
        })
    }
    // console.log('✅ Đã tạo thêm HarvestBatch bổ sung', batchData);

    await prisma.harvestBatch.createMany({
        data: batchData,
        skipDuplicates: true,
    });

    //Định nghĩa quy trình
    const svr3lDef = await prisma.processDefinition.create({
        data: {
            productType: "LY_TAM",
            name: "Quy trình ly tâm",
            isActive: true,
            steps: {
                create: [//quy trình giả sử
                    { stepOrder: 1, entityType: "Tank", requiresApproval: true },
                    { stepOrder: 2, entityType: "SheetRolling", requiresApproval: false },
                    { stepOrder: 3, entityType: "Furnace", requiresApproval: true }
                ]
            }
        }
    });
    console.log('✅ Đã tạo thêm ProcessDefinition bổ sung:', svr3lDef);

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
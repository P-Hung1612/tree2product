import { PrismaClient } from '@prisma/client';
import workers from "./data/worker.json";
import shifts from "./data/shift.json";
import vehicles from "./data/vehicle.json";
import tanks from "./data/tank.json";
import yards from "./data/yard.json";

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Đang bắt đầu quá trình Seed dữ liệu...');
    // Xoá dữ liệu cũ
    // await prisma.worker.deleteMany({});
    // await prisma.shift.deleteMany({});
    // await prisma.vehicle.deleteMany({});
    // await prisma.tank.deleteMany({});
    // await prisma.yard.deleteMany({});

    // Tạo dữ liệu mẫu
    // Worker mẫu
    for (const worker of workers) {
        await prisma.worker.upsert({
            where: { employeeCode: worker.employeeCode },
            update: {},
            create: {
                employeeCode: worker.employeeCode,
                name: worker.name,
                role: worker.role,
            },
        });
    }
    //Shift mẫu
    for (const shift of shifts) {
        await prisma.shift.upsert({
            where: { shiftCode: shift.shiftCode },
            update: {},
            create: {
                shiftCode: shift.shiftCode,
                workDate: new Date(),//tạm thời chưa có logic workDate và shiftCode chưa có nghiệp vụ rõ ràng
            },
        });
    }
    //Xe mẫu
    for (const vehicle of vehicles) {
        await prisma.vehicle.upsert({
            where: { plateNumber: vehicle.plateNumber },
            update: {},
            create: {
                plateNumber: vehicle.plateNumber,
                capacity: vehicle.capacity,
            },
        });
    }
    //Hồ mẫu
    for (const tank of tanks) {
        await prisma.tank.upsert({
            where: { tankCode: tank.tankCode },
            update: {},
            create: {
                tankCode: tank.tankCode,
                latexType: tank.latexType,
                capacity: tank.capacity,
                currentLevel: tank.currentLevel
            },
        });
    }
    //Sân mẫu
    for (const yard of yards) {
        await prisma.yard.upsert({
            where: { yardCode: yard.yardCode },
            update: {},
            create: {
                yardCode: yard.yardCode,
                location: yard.location,
                latexType: yard.latexType,
            },
        });
    }

    console.log('✅ Đã tạo dữ liệu mẫu thành công!');
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
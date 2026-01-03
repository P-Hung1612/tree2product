// src/server.ts
import 'dotenv/config'; // Load .env
import { PrismaClient } from '@prisma/client';
import { PrismaHarvestBatchRepository } from './infrastructure/database/prisma/repositories/PrismaHarvestBatchRepository';
// import { PrismaTraceLinkRepository } from '@infrastructure/database/prisma/repositories/PrismaTraceLinkRepository';
import { CreateHarvestBatchUseCase } from '@application/use_cases/CreateHarvestBatchUseCase';
import {v4 as uuidv4} from 'uuid';

// 1. Init Database Connection
const prisma = new PrismaClient();

// 2. Init Repositories (Inject Prisma)
const harvestBatchRepo = new PrismaHarvestBatchRepository(prisma);
// const traceLinkRepo = new PrismaTraceLinkRepository(prisma);

// 3. Init Use Cases (Inject Repo) - Phase 3 sẽ làm
const createBatchUseCase = new CreateHarvestBatchUseCase(harvestBatchRepo);
// const createTraceLinkUseCase = new CreateTraceLinkUseCase(traceLinkRepo);

// 4. Init Controllers (Inject Use Case) - Phase 4 sẽ làm

async function main() {
    // Test connection
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        // Start Server (Express App listen...)
        // app.listen(3000, ...)
        // --- TEST MANUAL NGAY TẠI ĐÂY ---
        // Giả lập Frontend gửi request
        console.log('🚀 Executing CreateBatchUseCase...');

        const newBatch = await createBatchUseCase.execute({
            workerId: '6af5650e-9fc7-46b9-bd96-d57a042e962f',
            shiftId: '1d91fd19-cf28-4e79-ab1e-47b734e7a6bb',
            latexType: 'NUOC',
            tappingAreaId: uuidv4(), // giả lập ID vùng khai thác
        });

        console.log('🎉 Batch Created:', newBatch);

        // Kiểm tra xem ID có được tạo ra không
        if (newBatch.id) console.log('✅ ID generated:', newBatch.id);
    } catch (error) {
        console.error('❌ Database connection failed', error);
        process.exit(1);
    }
    //
}

main();
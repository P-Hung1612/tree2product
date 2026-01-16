import 'dotenv/config'; // Load .env
import express from 'express';
// import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { PrismaHarvestBatchRepository } from './infrastructure/database/prisma/repositories/PrismaHarvestBatchRepository';
import { CreateHarvestBatchUseCase } from '@application/use_cases/CreateHarvestBatchUseCase';
import { CreateHarvestBatchController } from '@infrastructure/http/controllers/HarvestBatchController';
import { PrismaWeighedRecordRepository } from '@infrastructure/database/prisma/repositories/PrismaWeighedRecordRepository';
import { WeighBatchUseCase } from '@application/use_cases/WeighBatchUseCase';
import { CreateWeighBatchController } from '@infrastructure/http/controllers/WeighBatchController';
import { ConfirmBatchController } from '@infrastructure/http/controllers/ConfirmBatchController';
import { ConfirmBatchUseCase } from '@application/use_cases/ConfirmBatchUseCase';
import { CreateVehicleController } from '@infrastructure/http/controllers/VehicleController';
import { CreateVehicleUseCase } from '@application/use_cases/CreateVehicleUseCase';
import { PrismaVehicleRepository } from '@infrastructure/database/prisma/repositories/PrismaVehicleRepository';
import { LoadBatchToVehicleController } from '@infrastructure/http/controllers/LoadBatchToVehicleController';
import { LoadBatchToVehicleUseCase } from '@application/use_cases/LoadBatchToVehicleUseCase';
import { PrismaTraceLinkRepository } from '@infrastructure/database/prisma/repositories/PrismaTraceLinkRepository';
import { PrismaVehicleLoadRepository } from './infrastructure/database/prisma/repositories/PrismaVehicleLoadRepository';
import { CreateTankController } from '@infrastructure/http/controllers/TankController';
import { CreateTankUseCase } from '@application/use_cases/CreateTankUseCase';
import { PrismaTankRepository } from '@infrastructure/database/prisma/repositories/PrismaTankRepository';
import { ReceiveLoadController } from '@infrastructure/http/controllers/ReceiveLoadController';
import { ReceiveLoadToTankUseCase } from '@application/use_cases/ReceiveLoadToTankUseCase';
import { PrismaMaterialEntryRepository } from '@infrastructure/database/prisma/repositories/PrismaMaterialEntryRepository';


//--COMPOSITION ROOT (Nơi khởi tạo và kết nối tất cả các thành phần lại với nhau)
//1. Infra
const prisma = new PrismaClient();
const harvestBatchRepo = new PrismaHarvestBatchRepository(prisma);
const vehicleRepo = new PrismaVehicleRepository(prisma);
const traceLinkRepo = new PrismaTraceLinkRepository(prisma);
const vehicleLoadRepo = new PrismaVehicleLoadRepository(prisma);
const tankRepo = new PrismaTankRepository(prisma);
const materialEntryRepo = new PrismaMaterialEntryRepository(prisma);
//2. Use Cases
const createBatchUseCase = new CreateHarvestBatchUseCase(harvestBatchRepo);
const createWeighBatchUseCase = new WeighBatchUseCase(harvestBatchRepo, new PrismaWeighedRecordRepository(prisma));
const confirmBatchUseCase = new ConfirmBatchUseCase(harvestBatchRepo);
const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepo);
const loadBatchToVehicleUseCase = new LoadBatchToVehicleUseCase(vehicleLoadRepo, harvestBatchRepo, traceLinkRepo);
const createTankUseCase = new CreateTankUseCase(tankRepo);
const receiveLoadToTankUseCase = new ReceiveLoadToTankUseCase(traceLinkRepo,tankRepo,materialEntryRepo,vehicleLoadRepo);
//3. Controllers
const createBatchController = new CreateHarvestBatchController(createBatchUseCase);
const createWeighBatchController = new CreateWeighBatchController(createWeighBatchUseCase);
const confirmBatchController = new ConfirmBatchController(confirmBatchUseCase);
const createVehicleController = new CreateVehicleController(createVehicleUseCase);
const loadBatchToVehicleController = new LoadBatchToVehicleController(loadBatchToVehicleUseCase);
const createTankController = new CreateTankController(createTankUseCase);
const receiveLoadController = new ReceiveLoadController(receiveLoadToTankUseCase);
//--Express & Setup
const app = express();
app.use(express.json()); // Middleware để parse JSON body
//4.Define Routes
// Lưu ý: bind(controller) là bắt buộc để giữ ngữ cảnh 'this'
app.post('/api/v1/harvest-batches', (req, res) => createBatchController.execute(req, res));
app.post('/api/v1/harvest-batches/:id/weigh', (req, res) => createWeighBatchController.execute(req, res));
app.patch('/api/v1/harvest-batches/:id/confirm', (req, res) => confirmBatchController.execute(req, res));
app.post('/api/v1/vehicles', (req, res) => createVehicleController.execute(req, res));
app.post('/api/v1/vehicles/:id/load', (req, res) => loadBatchToVehicleController.execute(req, res));
app.post('/api/v1/tanks', (req, res) => createTankController.execute(req, res));
app.post('/api/v1/load/:id/tanks', (req,res) => receiveLoadController.execute(req,res));
//--START SERVER & DB CONNECTION

async function main() {
    // Test connection
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        // Start Server (Express App listen...)
        const PORT = process.env['PORT'] || 3000;//ko chấp nhận process.env.PORT
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
            console.log(`👉 Test POST at http://localhost:${PORT}/api/v1/harvest-batches`);
        });

        // app.listen(3000, ...)
        // --- TEST MANUAL NGAY TẠI ĐÂY ---
        // Giả lập Frontend gửi request
        // console.log('🚀 Executing CreateBatchUseCase...');

        // const newBatch = await createBatchUseCase.execute({
        //     workerId: '6af5650e-9fc7-46b9-bd96-d57a042e962f',
        //     shiftId: '1d91fd19-cf28-4e79-ab1e-47b734e7a6bb',
        //     latexType: 'NUOC',
        //     tappingAreaId: uuidv4(), // giả lập ID vùng khai thác
        // });

        // console.log('🎉 Batch Created:', newBatch);

        // Kiểm tra xem ID có được tạo ra không
        //     if (newBatch.id) console.log('✅ ID generated:', newBatch.id);
    } catch (error) {
        console.error('❌ Database connection failed', error);
        process.exit(1);
    }
    //
}

main();
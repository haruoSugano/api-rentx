import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { carsRoutes} from './cars.routes';

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specification", specificationRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes)
router.use(authenticateRoutes);

export { router };
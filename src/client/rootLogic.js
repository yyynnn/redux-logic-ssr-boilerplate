import { errorLogic } from 'client/errors/logic'
import { exampleLogic } from 'features/example/logic'

export const rootLogic = [...exampleLogic, ...errorLogic]

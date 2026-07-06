import ApiResponse from '../utils/api.response';
import { asyncHandler } from '../utils/async-handler';

const healthCheck = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, 'Server is running', null));
});
export { healthCheck };

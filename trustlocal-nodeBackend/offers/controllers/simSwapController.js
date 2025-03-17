const simSwapService = require('../../services/simSwapService');
const { getAccessToken } = require('../../auth/getAccessToken');

exports.checkSimSwap = async (req, res) => {
  try {
    const { phoneNumber, maxAge } = req.body;
    
    const token = await getAccessToken(
      process.env.ORANGE_CLIENT_ID,
      process.env.ORANGE_CLIENT_SECRET
    );

    const result = await simSwapService.checkSimSwap(token, phoneNumber, maxAge);

    if (!result.success) {
      return handleErrorResponse(res, result);
    }

    res.json({
      status: 'success',
      verification: result.data
    });

  } catch (error) {
    console.error('SIM Swap Controller Error:', error);
    res.status(500).json({
      status: 'error',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to complete SIM swap verification'
    });
  }
};

function handleErrorResponse(res, result) {
  const statusMapping = {
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    422: 'UNPROCESSABLE_ENTITY'
  };

  res.status(result.status).json({
    status: 'error',
    code: statusMapping[result.status] || 'API_ERROR',
    message: result.error.message,
    details: result.error
  });
}
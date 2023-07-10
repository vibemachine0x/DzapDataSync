import { Wallet, ethers } from "ethers";

const jsonRpcUrl =
  "https://polygon-mumbai.g.alchemy.com/v2/Ko1ZTIARgSv-ZGDJz2vUrHMsR7NOAdnV";
const privateKey =
  "a7a1c3b7186816ad4305eecf4b46cf31ec7d12db89b3b416c8dee84abb36ba42";
const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
const wallet = new Wallet(privateKey, provider);

const abi = [
  "constructor(address governor_, address wNative_, address feeVault_, address permit2_, uint256 maxNoOfSwap_)",
  "error HighFee()",
  "error HighPlatformFeeRatio()",
  "error InvalidAmount()",
  "error InvalidBlankSwap()",
  "error InvalidInterval()",
  "error InvalidLength()",
  "error InvalidMask()",
  "error InvalidNativeAmount()",
  "error InvalidNoOfSwaps()",
  "error InvalidPermit()",
  "error InvalidPermitData()",
  "error InvalidPosition()",
  "error InvalidRate()",
  "error InvalidReturnAmount()",
  "error InvalidSwapAmount()",
  "error InvalidToken()",
  "error NativeTransferFailed()",
  "error NoAvailableSwap()",
  "error NoChanges()",
  "error NotWNative()",
  "error SwapCallFailed()",
  "error UnauthorizedCaller()",
  "error UnauthorizedTokens()",
  "error ZeroAddress()",
  "error ZeroSwappedTokens()",
  "event AdminAdded(address[] accounts)",
  "event AdminRemoved(address[] accounts)",
  "event BlankSwapped(address indexed sender, address from, address to, bytes1 interval)",
  "event Created(address indexed user, uint256 positionId, bool isNative)",
  "event CreatedBatched(address indexed user, uint256 finalIndex, uint256 noOfPositions, bool[] isNative)",
  "event FeeVaultUpdated(address feeVault)",
  "event GovernanceChanged(address indexed formerGov, address indexed newGov)",
  "event Modified(address indexed user, uint256 positionId, uint256 rate, uint256 startingSwap, uint256 finalSwap, bool isNative)",
  "event Paused(address account)",
  "event PlatformFeeRatioUpdated(uint256 platformFeeRatio)",
  "event PositionOwnerUpdated(address indexed oldOwner, address indexed newOwner, uint256 positionId)",
  "event SwapExecutorAdded(address[] accounts)",
  "event SwapExecutorRemoved(address[] accounts)",
  "event SwapFeeUpdated(uint32[] intervals, uint256[] swapFee)",
  "event SwapIntervalsAdded(uint32[] swapIntervals)",
  "event SwapIntervalsRemoved(uint32[] swapIntervals)",
  "event SwapLimitUpdated(uint256 noOfSwaps)",
  "event SwapThresholdUpdated(uint256 threshold)",
  "event Swapped(address indexed sender, address indexed rewardRecipient, tuple(address from, address to, uint256 swappedAmount, uint256 receivedAmount, uint256 reward, uint256 fee, bytes1 intervalsInSwap)[] swapInformation)",
  "event Terminated(address indexed user, address indexed recipient, uint256 positionId, uint256 unswapped, uint256 swapped, bool isNative)",
  "event TokensAdded(address[] tokens)",
  "event TokensRemoved(address[] tokens)",
  "event TokensRescued(address indexed to, address indexed token, uint256 amount)",
  "event Unpaused(address account)",
  "event Withdrawn(address indexed user, address indexed recipient, uint256 positionId, uint256 swapped, bool isNative)",
  "function BPS_DENOMINATOR() view returns (uint256)",
  "function MAX_FEE() view returns (uint256)",
  "function MAX_PLATFORM_FEE_RATIO() view returns (uint256)",
  "function NATIVE_TOKEN() view returns (address)",
  "function PERMIT2() view returns (address)",
  "function accumRatio(address, address, bytes1, uint256) view returns (uint256)",
  "function activeSwapIntervals(address, address) view returns (bytes1)",
  "function addAdmins(address[] accounts_)",
  "function addAllowedTokens(address[] tokens_)",
  "function addSwapExecutors(address[] executor_)",
  "function addSwapIntervalsToAllowedList(uint32[] swapIntervals_)",
  "function admins(address) view returns (bool)",
  "function allowedSwapIntervals() view returns (bytes1)",
  "function allowedTokens(address) view returns (bool)",
  "function batchCall(bytes[] data_) returns (bytes[] results)",
  "function blankSwap(address from_, address to_, bytes1 maskedInterval_)",
  "function changeGovernance(address newGov)",
  "function createBatchPositions(tuple(address from, address to, uint32 swapInterval, uint256 amount, uint256 noOfSwaps, bytes permit)[] details_) payable",
  "function createPosition(tuple(address from, address to, uint32 swapInterval, uint256 amount, uint256 noOfSwaps, bytes permit) details_) payable",
  "function feeVault() view returns (address)",
  "function getNextSwapInfo(tuple(address from, address to)[] pairs_) view returns (tuple(address from, address to, uint256 swappedAmount, uint256 receivedAmount, uint256 reward, uint256 fee, bytes1 intervalsInSwap)[])",
  "function getPositionDetails(uint256 positionId_) view returns (tuple(address owner, address from, address to, uint32 swapInterval, uint256 rate, uint256 swapsExecuted, uint256 swapsLeft, uint256 swapped, uint256 unswapped) positionInfo)",
  "function getSwapFee(uint32 interval_) view returns (uint256)",
  "function governance() view returns (address)",
  "function maxNoOfSwap() view returns (uint256)",
  "function modifyPosition(uint256 positionId_, uint256 amount_, uint256 noOfSwaps_, bool isIncrease_, bool isNative_, bytes permit_) payable",
  "function nextToNextTimeThreshold() view returns (uint256)",
  "function pause()",
  "function paused() view returns (bool)",
  "function platformFeeRatio() view returns (uint256)",
  "function removeAdmins(address[] accounts_)",
  "function removeAllowedTokens(address[] tokens_)",
  "function removeSwapExecutors(address[] executor_)",
  "function removeSwapIntervalsFromAllowedList(uint32[] swapIntervals_)",
  "function secondsUntilNextSwap(tuple(address from, address to)[] pairs_) view returns (uint256[])",
  "function setFeeVault(address newVault_)",
  "function setPlatformFeeRatio(uint256 platformFeeRatio_)",
  "function setSwapFee(uint32[] intervals_, uint256[] swapFee_)",
  "function swap(tuple(address executor, address tokenProxy, address from, address to, uint256 amount, uint256 minReturnAmount, bytes swapCallData)[] data_, address rewardRecipient_)",
  "function swapAmountDelta(address, address, bytes1, uint256) view returns (uint256)",
  "function swapData(address, address, bytes1) view returns (uint256 performedSwaps, uint256 nextAmountToSwap, uint256 nextToNextAmountToSwap, uint256 lastSwappedAt)",
  "function swapExecutors(address) view returns (bool)",
  "function terminatePosition(uint256 positionId_, address recipient_, bool isNative_)",
  "function tokenMagnitude(address) view returns (uint256)",
  "function totalCreatedPositions() view returns (uint256)",
  "function transferPositionOwnership(uint256 positionId_, address newOwner_)",
  "function unpause()",
  "function updateMaxSwapLimit(uint256 maxNoOfSwap_)",
  "function updateSwapTimeThreshold(uint256 nextToNextTimeThreshold_)",
  "function userPositions(uint256) view returns (address owner, address from, address to, bytes1 swapIntervalMask, uint256 rate, uint256 swapWhereLastUpdated, uint256 startingSwap, uint256 finalSwap)",
  "function wNative() view returns (address)",
  "function withdrawPosition(uint256 positionId_, address recipient_, bool isNative_)",
];

enum PermitType {
  PERMIT2_APPROVE,
  PERMIT2_TRANSFER_FROM,
  PERMIT,
}

enum SwapIntervals {
  OneHour = 60 * 60,
  FourHour = 4 * 60 * 60,
  TwelveHour = 12 * 60 * 60,
  OneDay = 24 * 60 * 60,
  ThreeDay = 3 * 24 * 60 * 60,
  OneWeek = 7 * 24 * 60 * 60,
  TwoWeek = 14 * 24 * 60 * 60,
  OneMonth = 30 * 24 * 60 * 60,
}

const encodePermitData = (data: string, permitType: PermitType) => {
  // userPermit2, callData
  const encodedData = ethers.utils.defaultAbiCoder.encode(
    ["uint8", "bytes"],
    [permitType, data]
  );

  return encodedData;
};

export const startScript = async () => {
  try {
    console.log(`Deploying with account ${wallet.address}`);
    console.log(
      "Account balance admin:",
      (await wallet.getBalance()).toString()
    );

    const dcaAddress = "0x49E91d2e7F8d2751f982aFF6446D7Fd15E1E3b9C";

    // ----------------

    const dca = new ethers.Contract(dcaAddress, abi, wallet);

    // console.log(await dca.BPS_DENOMINATOR())

    // ----------------
    // addTokens
    // const tokens: any = [
    //   "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F",
    //   "0xff3fAD08C7287b5f79DCD08A662a49DFC8E618b2",
    // ];
    // const tx = await dca.addAllowedTokens(tokens);
    // console.log(await tx.wait());

    // ----------------
    // create

    const args = {
      from: "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F",
      to: "0xff3fAD08C7287b5f79DCD08A662a49DFC8E618b2",
      amount: 10000000,
      noOfSwaps: 2,
      swapInterval: SwapIntervals.OneHour,
      permit: encodePermitData("0x", PermitType.PERMIT),
    };

    const tx = await dca.createPosition(args);
    console.log("result", await tx.wait());

    // ----------------
    // terminate

    // const positionId = 5;
    // const recipient = "0x2CB99F193549681e06C6770dDD5543812B4FaFE8";
    // const isNative = false;
    // const tx = await dca.terminatePosition(positionId, recipient, isNative);
    // console.log(await tx.wait());

    // ----------------
    // withdraw

    // const positionId = 4;
    // const recipient = "0x2CB99F193549681e06C6770dDD5543812B4FaFE8";
    // const isNative = false;

    // const tx = await dca.withdrawPosition(positionId, recipient, isNative);
    // console.log("withdraw", await tx.wait());
  } catch (error) {
    console.log(error);
  }
};

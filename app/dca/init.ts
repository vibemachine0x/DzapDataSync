import { DCAEvents, NetworkIDs } from "./enums";
import { getContract, listenEvents } from "./utils";
import {
  handleClaimEventData,
  handleCreateEventData,
  handleModifyEventData,
  handleSwapEventData,
  handleTerminateEventData,
} from "./utils/action";

const subscribeEvents = (chainId: number) => {
  console.log("init", chainId);
  const contract = getContract(chainId);
  listenEvents(contract, DCAEvents.create, handleCreateEventData);
  listenEvents(contract, DCAEvents.swap, handleSwapEventData);
  listenEvents(contract, DCAEvents.terminate, handleTerminateEventData);
  listenEvents(contract, DCAEvents.modify, handleModifyEventData);
  listenEvents(contract, DCAEvents.claim, handleClaimEventData);
};

export const initDCA = () => {
  //   subscribeEvents(NetworkIDs.polygon);
  subscribeEvents(NetworkIDs.zkSync);
};

import { Organization, Participant } from "@xilution/todd-coin-types";
import _ from "lodash";

export const getResourceType = (resource: Participant | Organization): "organization" | "participant" => {
  if (_.keys(resource).some((key: string) => key === "name")) {
    return "organization";
  }
  return "participant";
};

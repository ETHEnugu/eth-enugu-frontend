export const BUILDER_RESIDENCY = {
  CREATE: "/builder",
  GET_BY_ID: (id: string) => `/builder/${id}`,
  GET_ALL: "/builder", // To get per page, we have </builder?page=1&limit=10>
};

export const CONFERENCE = {
  CREATE: "/conference",
  GET_BY_ID: (id: string) => `/conference/${id}`,
  GET_ALL: "/conference", //to get per page ?page=1&limit=10&status=PENDING
  UPDATE_STATUS: "/conference/status",
};

export const POPUP_CITY = {
  CREATE: "/popup",
  GET_BY_ID: (id: string) => `/popup/${id}`,
  GET_ALL: "/popup", //to get per page ?page=1&limit=10&status=PENDING
};

export const SPEAKER = {
  CREATE: "/speaker",
  GET_BY_ID: (id: string) => `/speaker/${id}`,
  GET_ALL: "/speaker", //to get per page ?page=1&limit=10&status=PENDING
  UPDATE_STATUS: "/speaker/status",
  DELETE: (id: string) => `/speaker/${id}`,
};

export type ActionObject = {
  type: string;
  payload: Object;
};

export type Action = {
  actionType: string;
  action: (payload: any) => ActionObject;
};

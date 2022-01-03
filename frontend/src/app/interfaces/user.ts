import {UserSubtireddInfo} from "./user-subtiredd-info";

export interface User {
  id: string
  userName: string;
  subtiredds?: UserSubtireddInfo[];
  managedSubtiredds?: UserSubtireddInfo[];
}

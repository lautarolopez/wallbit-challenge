import { MODE } from "@/constants/mode";

export type ModeType = (typeof MODE)[keyof typeof MODE];

import { configSchema } from "./InputCheckConfig";
import { jsonSchema } from "./InputCheckJson";

const ConfigCheck = (object: object) => {
    return configSchema.safeParse(object);
};

const JsonCheck = (object: object) => {
    return jsonSchema.safeParse(object);
};

export { ConfigCheck, JsonCheck };

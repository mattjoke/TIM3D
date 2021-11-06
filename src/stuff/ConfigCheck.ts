import { Config } from "@manualTypes/configTypes";
import * as Joi from "joi";

/*
export interface Config {
    container?: HTMLElement | null;
    enviroment?: {};
    overlay?: Element;
    movement?: {};
    color?: Color | string;
}
*/

const ConfigCheck = (config: Config) => {
    console.log(typeof config.color);

    const schema = Joi.object({
        container: Joi.object().optional(),
        color: Joi.alternatives().try(Joi.string(), Joi.object()),
    });

    return schema.validate(config);
};

export default ConfigCheck;

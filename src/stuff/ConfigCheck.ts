import { Config } from "@manualTypes/configTypes";
import Joi from "joi";

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

    /*
    const s = Joi.extend((joi) => ({
        base: joi.string(),
        name: "populatedString",
        language: {
            required:
                "needs to be a a string containing non whitespace characters",
        },
        pre(value, state, options) {
            value = value.trim();
            return value === "" ? undefined : value;
        },
        rules: [
            {
                name: "required",
                setup(params) {
                    return this.options({ presence: "required" });
                },
                validate(params, value, state, options) {
                    if (value === undefined) {
                        return this.createError(
                            "populatedString.required",
                            { v: value },
                            state,
                            options
                        );
                    }

                    return value;
                },
            },
        ],
    }));
    
    const schema = s.object({
        container: Joi.object().optional(),
        color: Joi.alternatives().try(Joi.string(), Joi.object()),
    });
    
    return schema.validate(config);
    */
};

export default ConfigCheck;

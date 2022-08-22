export const mode: string;
export const target: string;
export const entry: string;
export namespace module {
    const rules: ({
        test: RegExp;
        loader: string;
        use?: undefined;
        exclude?: undefined;
        options?: undefined;
    } | {
        test: RegExp;
        use: {
            loader: string;
        }[];
        loader?: undefined;
        exclude?: undefined;
        options?: undefined;
    } | {
        test: RegExp;
        use: string;
        exclude: RegExp;
        loader?: undefined;
        options?: undefined;
    } | {
        test: RegExp;
        loader: string;
        options: {
            knownHelpersOnly: boolean;
        };
        use?: undefined;
        exclude?: undefined;
    })[];
}
export namespace resolve {
    const extensions: string[];
    namespace fallback {
        const fs: boolean;
    }
    const plugins: any[];
}
export namespace output {
    const filename: string;
    const path: string;
    namespace library {
        const type: string;
    }
}

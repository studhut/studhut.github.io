export const PI: number = 3.141;

export const degToRad = (angle: number) => {
    return (angle * PI) / 180;
};

export const radToDeg = (angle: number) => {
    return (angle * 180) / PI;
};

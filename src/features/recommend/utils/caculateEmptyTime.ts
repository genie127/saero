// calculateBlankTime.ts

export const calculateBlankTime = (
    schoolEnd:string,
    goHome:string
) => {

    const end = new Date(`2025-01-01 ${schoolEnd}`);
    const home = new Date(`2025-01-01 ${goHome}`);

    const diff =
        (home.getTime() - end.getTime()) /
        1000 /
        60;

    return diff;
};
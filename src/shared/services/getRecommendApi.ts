// getCareFacilities.ts

export const getRecommendApi= async (
    sido:string,
    gungu:string
) => {

    const res = await fetch(
        `/api/recommend?sido=${sido}&gungu=${gungu}`
    );

    return res.json();
};
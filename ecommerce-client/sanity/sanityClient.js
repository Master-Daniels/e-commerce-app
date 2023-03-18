import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: "fu5qhzy4",
    dataset: "production",
    apiVersion: "2022-03-10",
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export const urlFor = (source) => imageUrlBuilder(client).image(source);

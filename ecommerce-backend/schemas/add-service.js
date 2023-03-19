export default {
    name: "add-service",
    title: "Add",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "desc",
            title: "Desc",
            type: "array",
            of: [
                {
                    type: "block",
                    title: "Block",
                    styles: [{ title: "Description", value: "desc" }],
                    lists: [],
                },
            ],
        },
        {
            name: "category",
            title: "Category",
            type: "string",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "price",
            title: "Price",
            type: "number",
        },
        {
            name: "availabilty",
            title: "Availability",
            type: "string",
        },
        {
            name: "review",
            title: "Review",
            type: "string",
        },
        {
            name: "vendorName",
            title: "Vendor Name",
            type: "string",
        },
        {
            name: "vendorImage",
            title: "Vendor Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
    ],
};
